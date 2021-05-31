<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <div class="bubble-header">
          <div class="score">
            SCORE： <animated-number :value="score" :format-value="formatScore" />
          </div>
            <div class="bubble-title">
              BUBBLE
            </div>
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
        <div class="bubble-card">
          <transition-group
            name="bubble"
            enter-active-class="animated slideInDown"
            type="animation"
            tag="div"
            class="grid"
          >
            <div
              v-for="(ball) in balls"
              :key="ball.primaryKey"
              :class="ball.className"
              @click="ballBreak(ball)"
              class="ball"
              :style="ball.gridArea"
            >{{ ball.ideograph }}</div>
          </transition-group>
        </div>
        <!-- EndOfGameダイアログ -->
        <EndOfGameDialog
          ref="dlg"
          :message="message"
          :resultStr="resultStr"
          :gameName="gameName"
          @retry="retry"
        ></EndOfGameDialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import EndOfGameDialog from "~/components/ui/EndOfGameDialog.vue";
import bubble23 from '~/assets/images/bubble/bubble2-3.mp3';
import bubble45 from '~/assets/images/bubble/bubble4-5.mp3';
import bubble69 from '~/assets/images/bubble/bubble6-9.mp3';
import bubble10 from '~/assets/images/bubble/bubble10.mp3';
const bubbleSound2_3 = new Audio(bubble23);
const bubbleSound4_5 = new Audio(bubble45);
const bubbleSound6_9 = new Audio(bubble69);
const bubbleSound10 = new Audio(bubble10);

export default {
  data: function() {
    return {
      score: 0,
      balls: [],
      ballClass: ["lisa", "jennie", "rose", "jisoo"],
      ideographs: ["🐱", "🐻", "🌹", "🐰"],
      xAxis: 10,
      yAxis: 16,
      message: "",
      gameName: "BUBBLE",
      newRecord: {
        name: "",
        twitterId: "",
        score: 0,
        modeType: "",
        clearTime: 0,
        myRank: "",
      },
      resultStr: "",
    }
  },
  methods: {
    retry() {
      // ボールを初期化し最初から
      this.$refs.dlg.isDisplay = false;
      this.score = 0;
      this.balls = [];
      this.getBalls;
    },
    ballBreak(ball) {
      // 選択したボールの削除処理
      // 削除対象のボールを取得
      this.breakCheckRecursive(ball, ball.className)
      let breakBalls = this.balls.filter(b => b.deleteFlag === this.$deleteFlag.delete);

      // 消える対象が無い場合return
      if (typeof breakBalls === "undefined") return

      // 削除対象を含めたballsのバックアップとballsから削除対象を削除
      const ballsBackUp = this.balls;

      // 下方向への詰め処理
      this.setGridArea(ballsBackUp, breakBalls);

      // 削除対象を削除
      this.balls = this.balls.filter(b => b.deleteFlag === this.$deleteFlag.display);

      // 効果音
      this.bubbleSound(breakBalls);

      // 右寄せ処理
      this.rightJustified();

      // 得点計算
      this.scoreCalculation(breakBalls);

      // 終了チェック
      this.endOfGameCheck();
    },
    breakCheckRecursive(startingBall, selectedClassName) {
      // 消える対象のボールを再帰的(上下左右)に取得
      // 上下左右に同色があるかチェック。存在した場合そのボールを起点に左右上下をチェック
      // 左(x-1 && y === y)
      const leftBall = this.balls.find(b => b.x === startingBall.x - 1 && b.y === startingBall.y);
      this.targetDelBall(leftBall, selectedClassName);

      // 右(x+1 && y === y)
      const rightBall = this.balls.find(b => b.x === startingBall.x + 1 && b.y === startingBall.y);
      this.targetDelBall(rightBall, selectedClassName);

      // 上(x === x && y - 10)
      const topBall = this.balls.find(b => b.x === startingBall.x && b.y === startingBall.y - 1);
      this.targetDelBall(topBall, selectedClassName);

      // 下(x === x && y + 10)
      const bottomBall = this.balls.find(b => b.x === startingBall.x && b.y === startingBall.y + 1);
      this.targetDelBall(bottomBall, selectedClassName);
    },
    targetDelBall(delBall, selectedClassName) {
      // 削除対象ボールのチェックと削除情報設定
      if (delBall && delBall.className === selectedClassName && delBall.deleteFlag === this.$deleteFlag.display) {
        // 同色かつ表示されているボールを削除対象とする
        let ball = this.balls.find(b => b.x === delBall.x && b.y === delBall.y)
        ball.deleteFlag = this.$deleteFlag.delete;
        ball.breakCheck = true;
        ball.className = "";

        // 起点を変え再度breakCheckRecursiveを呼び出す
        this.breakCheckRecursive(delBall, selectedClassName);
      }
    },
    setGridArea(ballsBackUp, breakBalls) {
      // 削除対象をループし、y軸方向へのgrid-areaを設定後削除対象ボールを削除する
      // 落下対象のボールをindexの降順で取得（下から上へ処理）
      let orderdBreakBalls = breakBalls.sort((a, b) => b.serialNumber - a.serialNumber);
      let xProcessed = [];

      // 削除対象をループ
      for (let i = 0; i < orderdBreakBalls.length; i++) {
        // 同じx軸のボールは既にgrid-areaを設定したためスキップ
        if (xProcessed.includes(orderdBreakBalls[i].x)) continue

        // 削除対象ボールを起点とし、起点より上にあるボールのgrid-areaを設定する
        let topBall = this.balls.find(b => b.x === orderdBreakBalls[i].x && b.y === (orderdBreakBalls[i].y - 1)) // 上のボール
        let downCount = 1; // 落下数
        // 先頭のy軸になるまでループ
        while (typeof topBall !== "undefined") {
          let beforeTopBallY = topBall.y; // topBallの元のy座標
          // 上のボールが表示対象のボールの場合
          if (topBall.deleteFlag === this.$deleteFlag.display) {
            // grid-areaを設定
            topBall.y += downCount;
            topBall.serialNumber += downCount * 10;
            topBall.gridArea = "grid-area: " + (topBall.y + 1) + " / " + (topBall.x + 1) + " / span 1 / span 1;"
          } else {
            // 上のボールが削除対象の場合、落下数を+1にして次のループ
            downCount++;
          }

          // 更に1つ上のボール
          topBall = this.balls.find(b => b.x === topBall.x && b.y === (beforeTopBallY - 1));
        }

        // x軸方向へは1度だけ落下処理したいため処理済みのx方向を保持
        xProcessed.push(orderdBreakBalls[i].x)
      }
    },
    bubbleSound(breakBalls) {
      // 削除数によって効果音を出す
      const breakCount = breakBalls.length;
      if (breakCount >= 10) {
        // 10以上
        bubbleSound10.volume = 1.0;
        bubbleSound10.play();
        bubbleSound10.currentTime = 0;
      } else if (breakCount >= 6 && breakCount <= 9) {
        // 6以上9以下
        bubbleSound6_9.volume = 1.0;
        bubbleSound6_9.play();
        bubbleSound6_9.currentTime = 0;
      } else if (breakCount >= 4 && breakCount <= 5) {
        // 4以上5以下
        bubbleSound4_5.volume = 1.0;
        bubbleSound4_5.play();
        bubbleSound4_5.currentTime = 0;
      } else if (breakCount >= 2 && breakCount <= 3) {
        // 2以上3以下
        bubbleSound2_3.volume = 1.0;
        bubbleSound2_3.play();
        bubbleSound2_3.currentTime = 0;
      }
    },
    rightJustified() {
      // 右寄せチェック
      // 右へ移動数
      let rightCount = 0; // 右へ移動数
      let movementFlag = false; // 右へ移動確定フラグ
      let xAxis = this.xAxis - 1; // x軸
      // x軸分ループ
      while (xAxis >= 0) {
        // x方向のリストを取得
        let xBalls = this.balls.filter(b => b.x === xAxis);

        if (xBalls.length === 0) {
          // x軸に存在しない場合
          rightCount++;
          // 左隣のx軸を取得
          let nextXBalls = this.balls.filter(b => b.x === (xAxis - 1) && b.deleteFlag === this.$deleteFlag.display);
          if (nextXBalls.length !== 0) {
            // x軸を右寄せ
            this.xMovement(nextXBalls, rightCount);
          } else {
            // 左隣のx軸が取得できなかった場合、更に左隣のx軸を取得
            rightCount++;
          }

          // 他のx軸も確定で移動
          xAxis--;
          movementFlag = true;
        } else if (xBalls.length > 0 && movementFlag) {
          // 移動が確定している場合、x軸を右寄せ
          this.xMovement(xBalls, rightCount);
        }

        xAxis--;
      }
    },
    xMovement(xBalls, rightCount) {
      // 右寄せ処理
      xBalls = xBalls.map(function(xBall) {
        xBall.x += rightCount;
        xBall.serialNumber += rightCount;
        xBall.gridArea = "grid-area: " + (xBall.y + 1) + " / " + (xBall.x + 1) + " / span 1 / span 1;";
        return xBalls
      });
    },
    scoreCalculation(breakBalls) {
      // 得点計算
      const addScore = breakBalls.length * (breakBalls.length - 1);
      this.score += addScore;
    },
    formatScore(score) {
      // 数値アニメーションのフォーマット（小数点以下切り捨て）
      return Math.floor(score)
    },
    endOfGameCheck() {
      if (this.balls.length === 0) {
        // 終了処理(パーフェクトの場合＋3000)
        this.score += 3000;
        this.message = this.$gameMessage.perfect + "（+3000）";
        this.endOfGame();
        return
      }

      // 削除対象ボールの存在チェック
      const breakBallsYes = this.balls.some(breakBall => {
        const leftBall = this.balls.find(b => b.x === breakBall.x - 1 && b.y === breakBall.y); // 左(x-1 && y === y)
        const rightBall = this.balls.find(b => b.x === breakBall.x + 1 && b.y === breakBall.y); // 右(x+1 && y === y)
        const topBall = this.balls.find(b => b.x === breakBall.x && b.y === breakBall.y - 1); // 上(x === x && y - 10)
        const bottomBall = this.balls.find(b => b.x === breakBall.x && b.y === breakBall.y + 1); // 下(x === x && y + 10)
        // 削除対象ボールのチェックと削除情報設定
        if ((leftBall && leftBall.className === breakBall.className && leftBall.deleteFlag === this.$deleteFlag.display)
        || (rightBall && rightBall.className === breakBall.className && rightBall.deleteFlag === this.$deleteFlag.display)
        || (topBall && topBall.className === breakBall.className && topBall.deleteFlag === this.$deleteFlag.display)
        || (bottomBall && bottomBall.className === breakBall.className && bottomBall.deleteFlag === this.$deleteFlag.display)) {
          return true
        }
      });

      if (!breakBallsYes) {
        // 終了処理
        this.message = this.balls.length < 8 ? this.$gameMessage.clear : this.$gameMessage.gameOver;
        this.endOfGame();
      }
    },
    endOfGame() {
      // 終了処理
      // ランキング登録
      this.addBubbleRanking();

      // ゲーム終了ダイアログ表示
      this.resultStr = "SCORE： " + this.score;
      this.$refs.dlg.isDisplay = true;
      // $nextTickでv-if内の要素が表示されたときにDOM操作したい場合
      this.$nextTick(() => {
        // ダイアログにある4つの泡divをランダム表示させる
        let ballList = document.getElementById('random-balls').getElementsByClassName('ball'); // ダイアログの4つの泡divを取得
        const randomBalls = () => {
          for (let i = (ballList.length - 1); 0 < i; i--) {
            // ランダムで要素数1つを取得
            let r = Math.floor(Math.random() * (i + 1));
            // appendChildで並び替え
            document.getElementById('random-balls').appendChild(ballList[r]);
          }

          if (timer !== null && !this.$refs.dlg.isDisplay) {
            // ダイアログを閉じたらストップ
            clearInterval(timer);
          }
        };
        // タイマー開始
        let timer = null; // セットインターバル関数を初期化
        timer = setInterval(randomBalls, 500);
      });
    },
    addBubbleRanking() {
      // ランキング登録処理
      this.newRecord.name = this.$store.getters['localStorages/getUserName'] ? this.$store.getters['localStorages/getUserName'] : this.$user.defaultName;
      this.newRecord.twitterId = this.$store.getters['localStorages/getTwitterId'] ? this.$store.getters['localStorages/getTwitterId'] : ""; // ローカルストレージよりTwitterId取得
      this.newRecord.score = this.score;
      this.newRecord.modeType = this.$store.getters['localStorages/choiceMode'].modeType;
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
  },
  computed: {
    getBalls() {
      // 通し番号
      let serialNumber = 0;
      // 泡divクラス(スマホ表示とそれ以外でフォントサイズを変更（絵文字を綺麗に見せるため）)
      let ballFontSize = this.$vuetify.breakpoint.xs ? " ball-font-size-xs" : " ball-font-size";
      // y座標
      for (let i = 0; i < this.yAxis; i++) {
        // x座標
        for (let j = 0; j < this.xAxis; j++) {
          const num = Math.floor(Math.random() * this.ballClass.length);
          let ballInfo = {
            className: this.ballClass[num] + ballFontSize,
            ideograph: this.ideographs[num],
            x: j,
            y: i,
            serialNumber: serialNumber,
            deleteFlag: 0,
            breakCheck: false,
            primaryKey: Math.random().toString(32).substring(2),
            gridArea: "grid-area: " + (i + 1) + " / " + (j + 1) + " / span 1 / span 1;"
          }

          this.balls.push(ballInfo);
          serialNumber++;
        }
      }

      return this.balls
    },
  },
  created() {
    // ballsに初期値をセット
    this.balls = this.getBalls
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
  components: {
    AnimatedNumber,
    EndOfGameDialog,
  }
}
</script>

<style scoped lang="scss">
// ヘッダー領域
.bubble-header {
  display: flex;
  width: 100%;
  .score {
    padding-top: 1%;
    margin: 0% 0;
    width: 33%;
    color: $base-text-color;
  }
  .bubble-title {
    width: 33%;
    margin: 0% auto;
    font-size: 25px;
    color: $base-text-color;
  }
  .replay {
    margin: 0% 1% 0% auto;
    width: 4%;
    button {
      width: 100%;
      height: 100%;
      color: $base-text-color;
    }
  }
}

// bubbleカード領域
.bubble-card {
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  height: 71vh;
  border: solid 2px $base-text-color;
  border-radius: 7px;
  .grid {
    cursor: pointer;
    --grid-width:10;
    --grid-height:16;
    align-self: center;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(var(--grid-width),1fr);
    grid-template-rows: repeat(var(--grid-height),1fr);
    grid-gap: 1px;
    margin-top: 0px;
    flex: 1;
    padding: 3px;
    border-radius: 8px;
    grid-auto-columns: 1fr;
    position: relative;
    // 空ボール
    .ball {
      position: relative;
      margin: 0.5%;
      height: 4vh;
      text-align: center;
      background-color: $base-bg-color;
      border: 2px solid $base-text-color;
      border-radius: 100%;
    }
    .ball-font-size-xs {
      font-size: 17px;
    }
    .ball-font-size {
      font-size: 25px;
    }
    .lisa {
      background-color: $ball-green-color;
      border: 2px solid $ball-green-color;
    }
    .jennie {
      background-color: $ball-red-color;
      border: 2px solid $ball-red-color;
    }
    .rose {
      background-color: $ball-orange-color;
      border: 2px solid $ball-orange-color;
    }
    .jisoo {
      background-color: $ball-purple-color;
      border: 2px solid $ball-purple-color;
    }
  }
}

// バブルアニメーション
.bubble-move {
  transition: transform 0.5s;
}
</style>