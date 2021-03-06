<template>
  <div>
    <v-row justify="center" align="center" class="puzzle">
      <v-col cols="12" sm="8">
        <ModeTitle></ModeTitle>
        <div class="puzzle-header">
          <Time
            :timerObject="timerObject"
            ref="time"
          ></Time>
          <div class="replay">
            <v-btn
              icon
              class="replay-btn"
              @click="retry()"
            >
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="text-center">
          <div class="puzzle-card">
            <transition-group
              name="puzzle"
              tag="div"
              class="grid"
            >
              <div
                v-for="piece in pieces"
                :key="piece.serialNumber"
                @click="pieceMove(piece)"
                class="piece"
                :class="piece.class"
                :style="piece.gridArea"
              ></div>
            </transition-group>
          </div>
        </div>
        <!-- EndOfGameダイアログ -->
        <EndOfGameDialog
          ref="dlg"
          :message="message"
          :resultStr="resultStr"
          :gameName="gameName"
          @retry="retry"
          @to-ranking="toRanking"
        ></EndOfGameDialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ui/ModeTitle.vue';
import Time from '~/components/ui/Time.vue';
import EndOfGameDialog from '~/components/ui/EndOfGameDialog.vue';

export default {
  data: function() {
    return {
      pieces: [],
      xAxis: 3,
      yAxis: 3,
      gameName: "PUZZLE",
      timerObject: {
        animateFrame: 0, // requestAnimationFrame(cd)の返り値(requestID)が入る
        nowTime: 0, // 現在時刻
        diffTime: 0, // 現在時刻とスタートボタンを押した時刻の差
        startTime: 0, // スタートボタンを押した時刻
        isRunning: false // 計測中の状態保持
      },
      newRecord: {
        name: "",
        twitterId: "",
        score: 0,
        modeType: "",
        clearTime: 0,
        myRank: "",
      },
      message: "",
      resultStr: "",
      timer: null,
    }
  },
  methods: {
    retry() {
      // puzzleを初期化し最初から
      this.stopTimer();
      this.$refs.dlg.isDisplay = false;
      this.timerObject = {
        animateFrame: 0,
        nowTime: 0,
        diffTime: 0,
        startTime: 0,
        isRunning: false
      };
      this.pieces = [];
      this.getPieces;
      this.setRandomPieces;
      // 新しいピースリストの非表示ピースのopacityを0に戻す
      document.getElementsByClassName('piece-none')[0].style.opacity = "";

      let _this = this; // 入れ子関数内はグローバルになるためVueインスタンスであるthisを別で持っておく（値渡し）
        this.sleep(1, function() {
          // コールバックfunction
          // 1秒待って、タイマースタート（親から子のVueインスタンスのメソッドを呼ぶ）
          _this.$refs.time.timeStart(_this.timerObject);
        });
    },
    pieceMove(piece, randomCheck) {
      // ピースの移動
      // クリックしたピースとの上下左右の空きをチェック
      const leftPiece = this.pieces.find(p => p.x === piece.x - 1 && p.y === piece.y);
      const rightPiece = this.pieces.find(p => p.x === piece.x + 1 && p.y === piece.y);
      const topPiece = this.pieces.find(p => p.x === piece.x && p.y === piece.y - 1);
      const bottomPiece = this.pieces.find(p => p.x === piece.x && p.y === piece.y + 1);
      let displayNonePiece = this.pieces.find(p => p.displayFlag);

      // 左右上下で1つでも空きがある場合
      if (leftPiece === displayNonePiece
      || rightPiece === displayNonePiece
      || topPiece === displayNonePiece
      || bottomPiece === displayNonePiece) {
        // 空きがある場合、空きのクリックしたピースと空きのスペース情報を交換
        const choicePiece = Object.assign({}, piece);
        // 選択したピース
        piece.x = displayNonePiece.x;
        piece.y = displayNonePiece.y;
        piece.serialNumber = displayNonePiece.serialNumber;
        piece.gridArea = displayNonePiece.gridArea;

        // 非表示ピース
        displayNonePiece.x = choicePiece.x;
        displayNonePiece.y = choicePiece.y;
        displayNonePiece.serialNumber = choicePiece.serialNumber;
        displayNonePiece.gridArea = choicePiece.gridArea;
        if (randomCheck) return;
      } else {
        return
      }

      // 正誤判定
      this.answerJudgment()
    },
    answerJudgment() {
      // 正誤判定処理
      const judgment = this.pieces.filter(p => p.serialNumber === p.answer);
      if (judgment && judgment.length === this.xAxis * this.yAxis) {
        // ピースの総数と正当数が一致の場合、終了処理
        this.endOfPuzzleGame();
      }
    },
    endOfPuzzleGame() {
      // 終了処理
      // タイマーストップ処理
      this.stopTimer();
      // ランキング登録
      this.addPuzzleRanking();
      // 最後のピースをfadeInで表示させ3秒待つ
      this.displayLastPiece();
    },
    stopTimer() {
      // タイマーストップ処理
      // タイマーの初期化
      let vm = this.timerObject;
      vm.isRunning = false;
      // 実際のタイマーストップ処理
      cancelAnimationFrame(vm.animateFrame);
    },
    addPuzzleRanking() {
      // ランキング登録
      this.newRecord.name = this.$store.getters['localStorages/getUserName'] ? this.$store.getters['localStorages/getUserName'] : this.$user.defaultName;
      this.newRecord.twitterId = this.$store.getters['localStorages/getTwitterId'] ? this.$store.getters['localStorages/getTwitterId'] : ""; // ローカルストレージよりTwitterId取得
      this.newRecord.modeType = this.$store.getters['localStorages/choiceMode'].modeType;
      this.newRecord.clearTime = this.$options.filters.replaceClearTimeWithNumber(document.getElementById("time").textContent.trim());
      this.setMyRank();
    },
    setMyRank() {
      // モード種別ごとのランキングを取得
      let rankings = this.$store.getters['rankings/rankingsByModeType'](this.$store.getters['localStorages/choiceMode'].modeType);
      
      // 今回の結果のオブジェクトをランキング配列に追加
      const myRankObject = {
        id: this.$user.defaultRankId,
        score: this.newRecord.score,
        clearTime: 0,
        createdAt: this.$store.getters['rankings/serverTime']
      }
      rankings.push(myRankObject);

      // ランキングソート
      rankings.sort(function(a, b) {
        // scoreの降順
        if (a.score !== b.score) {
          return (a.score - b.score) * -1
        }

        // clearTimeの昇順
        if (a.clearTime !== b.clearTime) {
          return a.clearTime - b.clearTime
        }

        // createdAtの降順
        if (a.createdAt !== b.createdAt) {
          return (a.createdAt - b.createdAt) * -1
        }
      });

      // 今回のランクをセット
      this.newRecord.myRank = rankings.indexOf(rankings.find(ranking => ranking.id === this.$user.defaultRankId)) + 1;
      // 20位以内の場合のみかつゲストモードでない場合、ランキングを登録
      if (this.newRecord.myRank <= 20 && !this.$store.getters["localStorages/getGuestPlay"]) this.$store.dispatch('rankings/add', this.newRecord);
    },
    displayLastPiece() {
      // DOM更新されるのを待ってから実行（nextTick）
      this.$nextTick(() => {
        // 非表示にしている最後のピースdivを取得
        let lastPiece = document.getElementsByClassName('piece-none')[0];
        let opacityInt = 0;
        // フェードイン処理（opacityを100ミリ秒ごとに0.1ずつ増やす）
        const IntervalId = setInterval(() => {
          opacityInt += 10;
          lastPiece.style.opacity = opacityInt / 100;
          if (lastPiece.style.opacity >= 1) {
            clearInterval(IntervalId);

            // 2秒待って、ダイアログ表示(完成したパズルを見る時間)
            let _this = this; // 入れ子関数内はグローバルになるためVueインスタンスであるthisを別で持っておく（値渡し）
            this.sleep(2, function() {
              // コールバックfunction
              _this.resultStr = "CLEAR TIME： " + document.getElementById("time").textContent.trim();
              _this.message = _this.$gameMessage.perfect;
              _this.$refs.dlg.isDisplay = true;

              // $nextTickでv-if内の要素が表示されたときにDOM操作したい場合
              _this.$nextTick(() => {
                // ダイアログにある4つの泡divをランダム表示させる
                let peaceList = document.getElementsByClassName('puzzle-area')[0].getElementsByClassName('puzzle-peace'); // ダイアログの4つのピースdivを取得
                const randomBalls = () => {
                  for (let i = (peaceList.length - 1); 0 < i; i--) {
                    // ランダムで要素数1つを取得
                    let r = Math.floor(Math.random() * (i + 1));
                    // appendChildで並び替え
                    document.getElementsByClassName('puzzle-area')[0].appendChild(peaceList[r]);
                  }

                  if (timer !== null && !_this.$refs.dlg.isDisplay) {
                    // ダイアログを閉じたらストップ
                    clearInterval(timer);
                  }
                };
                // タイマー開始
                let timer = null; // セットインターバル関数を初期化
                timer = setInterval(randomBalls, 500);
                _this.timer = timer;
              });
            });
          }
        }, 100)
      });
    },
    sleep(waitSec, callbackFunc) {
      // javascriptではsleep処理がないため自前で書く(指定された秒数待って、第二引数の関数を実行)
      // 経過時間（秒）
      let spanedSec = 0;

      // 実際のスリープ処理を無名関数で(1秒間隔で無名関数を実行)
      let id = setInterval(function() {
        spanedSec++;

        // 経過時間 >= 待機時間の場合、待機終了
        if (spanedSec >= waitSec) {
          // タイマー停止
          clearInterval(id);
          // コールバック関数実行（ダイアログ表示の）
          // グローバルでcallbackFuncつまりsleepの第二引数を呼んでいるためcallbackFunc内のthisはwindowオブジェクトになる
          if (callbackFunc) callbackFunc();
        }
      }, 1000); // 1秒間隔
    },
    toRanking() {
      clearInterval(this.timer);
      this.$router.push({ path: "/ranking" });
    }
  },
  computed: {
    // getPieces() {
    //   // 通し番号
    //   let serialNumber = 0;
    //   // ピース番号の配列
    //   let pieceNumbers = this.getRandomNumbers;
    //   // ランダム位置y
    //   let randomYs = [0, 1, 2];
    //   // y座標
    //   for (let i = 0; i < this.yAxis; i++) {
    //     // y座標をランダム抽出
    //     const randomY = randomYs[Math.floor(Math.random() * randomYs.length)]
    //     // ランダム位置x
    //     let randomXs = [0, 1, 2];

    //     // x座標
    //     for (let j = 0; j < this.xAxis; j++) {
    //       // x座標をランダム抽出
    //       const randomX = randomXs[Math.floor(Math.random() * randomXs.length)]
    //       let pieceInfo = {
    //         x: randomX, // x座標
    //         y: randomY, // y座標
    //         serialNumber: randomX + (randomY * this.xAxis), // 通し番号
    //         // serialNumber: pieceNumbers[serialNumber],
    //         gridArea: "grid-area: " + (randomY + 1) + " / " + (randomX + 1) + " / span 1 / span 1;", // ピースのgrid位置
    //         answer: pieceNumbers[serialNumber], // 答えの番号
    //         class: pieceNumbers[serialNumber] === 8 ? "piece-" + pieceNumbers[serialNumber] + " piece-none" : "piece-" + pieceNumbers[serialNumber], // ピースの実体
    //         displayFlag: pieceNumbers[serialNumber] === 8 ? true : false,
    //       }

    //       this.pieces.push(pieceInfo);
    //       serialNumber++;
    //       randomXs = randomXs.filter(x => x !== randomX); // 使用したランダムの座標を削除
    //     }

    //     randomYs = randomYs.filter(x => x !== randomY); // 使用したランダムの座標を削除
    //   }

    //   return this.pieces;
    // },
    getPieces() {
      // 通し番号
      let serialNumber = 0;

      // y座標
      for (let i = 0; i < this.yAxis; i++) {
        // x座標
        for (let j = 0; j < this.xAxis; j++) {
          // pieceインスタンスの作成
          let pieceInfo = {
            x: j, // x座標
            y: i, // y座標
            serialNumber: serialNumber, // 通し番号
            gridArea: "grid-area: " + (i + 1) + " / " + (j + 1) + " / span 1 / span 1;", // ピースのgrid位置
            answer: serialNumber, // 答えの番号
            class: serialNumber === 8 ? "piece-" + serialNumber + " piece-none" : "piece-" + serialNumber, // ピースの実体
            displayFlag: serialNumber === 8 ? true : false,
          }

          this.pieces.push(pieceInfo);
          serialNumber++;
        }
      }

      return this.pieces;
    },
    setRandomPieces() {
      // 100回ピース移動
      for (let i=0;i<150;i++) {
        // 空のピースを取得
        let displayNonePiece = this.pieces.find(p => p.displayFlag);

        // 空のピースを基準に上下左右のピースオブジェクトを配列で保持
        let targetPieces = [];
        targetPieces.push(this.pieces.find(p => p.x === displayNonePiece.x - 1 && p.y === displayNonePiece.y));
        targetPieces.push(this.pieces.find(p => p.x === displayNonePiece.x + 1 && p.y === displayNonePiece.y));
        targetPieces.push(this.pieces.find(p => p.x === displayNonePiece.x && p.y === displayNonePiece.y - 1));
        targetPieces.push(this.pieces.find(p => p.x === displayNonePiece.x && p.y === displayNonePiece.y + 1));

        // 上下左右のピースオブジェクト配列からランダムで１件取得（ピースが存在する）
        targetPieces = targetPieces.filter(tp => tp !== undefined);
        let targetPiece = targetPieces[Math.floor(Math.random() * targetPieces.length)];

        // 取得したピースに対してpieceMoveメソッドで移動させる
        this.pieceMove(targetPiece, true);
      }
    },
    getRandomNumbers() {
      // ピースの一意な数値をシャッフルして返す
      let numbers = [];
      let max = this.xAxis * this.yAxis;
      for (let i = 0; i < max; i++) {
        // x * y分を配列で保持
        numbers.push(i);
      }

      // 配列の中身をシャッフル
      for (let i = numbers.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の数値を入れ変える
        [numbers[i], numbers[rand]] = [numbers[rand], numbers[i]]
      }

      return numbers;
    },
  },
  filters: {
    // フォーマット整形
    replaceClearTimeWithNumber: function(value) {
      // タイマーの「:」と「.」を削除しNumber型に変換する
      return Number(value.replace(/:/g, '').replace(/\./g, ''));
    }
  },
  created() {
    // piecesに初期値をセット
    this.pieces = this.getPieces;
    // 初回ピースをランダムに配置（必ず正解できる形でランダムに配置する）
    this.setRandomPieces;
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
  components: {
    ModeTitle,
    Time,
    EndOfGameDialog,
  }
}
</script>

<style scoped lang="scss">
.puzzle-header {
  margin: 3% auto 0% auto;
  display: flex;
  width: 355px;
  .replay {
    margin: 0% 2% 0% auto;
    width: 4%;
    button {
      width: 100%;
      height: 100%;
      color: $base-text-color;
    }
  }
}

.puzzle-card {
  margin: 3% auto;
  width: 355px;
  background-color: $base-glay;
  padding: 11px;
  border: solid 2px $base-text-color;
  .grid {
    cursor: pointer;
    --grid-width: 3;
    --grid-height: 3;
    align-self: center;
    display: grid;
    width: 100%;
    max-width: 325px;
    height: 325px;
    grid-template-columns: repeat(var(--grid-width),1fr);
    grid-template-rows: repeat(var(--grid-height),1fr);
    grid-gap: 1px;
    flex: 1;
    grid-auto-columns: 1fr;
    position: relative;
  }
}

// 画像ファイル
$piece-image: url('~/assets/images/puzzle/krunk.png');

// ピース位置
.piece {
  background-size: 300% !important;
  height: 108px;
}
.piece-0 {
  background: $piece-image no-repeat top left;
}
.piece-1 {
  background: $piece-image no-repeat top center;
}
.piece-2 {
  background: $piece-image no-repeat top right;
}
.piece-3 {
  background: $piece-image no-repeat center left;
}
.piece-4 {
  background: $piece-image no-repeat center center;
}
.piece-5 {
  background: $piece-image no-repeat center right;
}
.piece-6 {
  background: $piece-image no-repeat bottom left;
}
.piece-7 {
  background: $piece-image no-repeat bottom center;
}
.piece-8 {
  background: $piece-image no-repeat bottom right;
}
.piece-none {
  opacity: 0;
}
</style>
