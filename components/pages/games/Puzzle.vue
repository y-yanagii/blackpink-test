<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <ModeTitle></ModeTitle>
        <!-- <Time class="puzzle-time" :timerObject="timerObject"></Time> -->
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
              >{{piece.serialNumber}}{{piece.answer}}</div>
            </transition-group>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ui/ModeTitle.vue';
import Time from '~/components/ui/Time.vue';

export default {
  data: function() {
    return {
      pieces: [],
      xAxis: 3,
      yAxis: 3,
      timerObject: {
        animateFrame: 0, // requestAnimationFrame(cd)の返り値(requestID)が入る
        nowTime: 0, // 現在時刻
        diffTime: 0, // 現在時刻とスタートボタンを押した時刻の差
        startTime: 0, // スタートボタンを押した時刻
        isRunning: false // 計測中の状態保持
      },
    }
  },
  methods: {
    pieceMove(piece) {
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
      } else {
        return
      }

      // 正誤判定
      this.answerJudgment()
    },
    answerJudgment() {
      // 正誤判定処理
    },
    stopTimer() {
      // タイマーストップ処理
      // タイマーの初期化
      let vm = this.timerObject;
      vm.isRunning = false;
      // 実際のタイマーストップ処理
      cancelAnimationFrame(vm.animateFrame);
    },

  },
  computed: {
    getPieces() {
      // 通し番号
      let serialNumber = 0;
      // ピース番号の配列
      let pieceNumbers = this.getRandomNumbers;
      // ランダム位置y
      let randomYs = [0, 1, 2];
      // y座標
      for (let i = 0; i < this.yAxis; i++) {
        // y座標をランダム抽出
        const randomY = randomYs[Math.floor(Math.random() * randomYs.length)]
        // ランダム位置x
        let randomXs = [0, 1, 2];

        // x座標
        for (let j = 0; j < this.xAxis; j++) {
          // x座標をランダム抽出
          const randomX = randomXs[Math.floor(Math.random() * randomXs.length)]
          let pieceInfo = {
            x: randomX, // x座標
            y: randomY, // y座標
            serialNumber: randomX + (randomY * this.xAxis), // 通し番号
            gridArea: "grid-area: " + (randomY + 1) + " / " + (randomX + 1) + " / span 1 / span 1;", // ピースのgrid位置
            answer: pieceNumbers[serialNumber], // 答えの番号
            class: pieceNumbers[serialNumber] === 8 ? "piece-" + pieceNumbers[serialNumber] + " piece-none" : "piece-" + pieceNumbers[serialNumber], // ピースの実体
            displayFlag: pieceNumbers[serialNumber] === 8 ? true : false,
          }

          this.pieces.push(pieceInfo);
          serialNumber++;
          randomXs = randomXs.filter(x => x !== randomX); // 使用したランダムの座標を削除
        }

        randomYs = randomYs.filter(x => x !== randomY); // 使用したランダムの座標を削除
      }

      return this.pieces;
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
  created() {
    // piecesに初期値をセット
    this.pieces = this.getPieces;
  },
  components: {
    ModeTitle,
    Time,
  }
}
</script>

<style scoped lang="scss">
.puzzle-time {
  margin-right: 5%;
  text-align: center !important;
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
  display: none;
}
</style>
