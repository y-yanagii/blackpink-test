<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <div class="bubble-header">
          <div class="score">
            SCORE： {{ score }}
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
            name="bounce"
            enter-active-class="bounceIn"
            leave-active-class="bounceOut"
            appear
            tag="div"
            class="grid"
          >
            <div
              v-for="(ball, index) in balls"
              :key="ball.serialNumber"
              :class="ball.className"
              @click="ballBreak(ball)"
              class="ball"
            >{{ index }}</div>
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      score: 0,
      balls: [],
      ballClass: ["lisa", "jennie", "rose", "jisoo"],
    }
  },
  methods: {
    retry() {
      // ボールを初期化し最初から
      this.score = 0;
      this.balls = [];
      this.getBalls;
    },
    ballBreak(ball) {
      // 削除対象のボールを取得
      this.breakCheckRecursive(ball, ball.className)
      let breakBalls = this.balls.filter(b => b.deleteFlag === this.$deleteFlag.delete);

      // 消える対象が無い場合return
      if (typeof breakBalls === "undefined") return

      // 削除対象のボールの削除フラグを2へ変更し、ballsから削除対象を削除
      this.balls = this.balls.filter(b => b.deleteFlag !== this.$deleteFlag.delete);
      // breakBalls = breakBalls.map(function(b) { b.deleteFlag = 2; return b })

      // 下方向への詰め処理
      this.ballDown(breakBalls);

      // 得点計算
      this.scoreCalculation(breakBalls);
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
        this.balls[delBall.serialNumber].deleteFlag = this.$deleteFlag.delete;

        // 起点を変え再度breakCheckRecursiveを呼び出す
        this.breakCheckRecursive(delBall, selectedClassName);
      }
    },
    ballDown(breakBalls) {
      debugger
      // 
    },
    scoreCalculation(breakBalls) {
      const addScore = breakBalls.length * (breakBalls.length - 1);
      this.score += addScore;
    },
  },
  computed: {
    getBalls() {
      // 通し番号
      let serialNumber = 0;
      // y座標
      for (let i = 0; i < 16; i++) {
        // x座標
        for (let j = 0; j < 10; j++) {
          let ballInfo = {
            className: this.ballClass[Math.floor(Math.random() * this.ballClass.length)],
            x: j,
            y: i,
            serialNumber: serialNumber,
            deleteFlag: 0,
            breakCheck: false,
          }

          this.balls.push(ballInfo);
          serialNumber++;
        }
      }

      return this.balls
    },
    // 2次元配列型
    // balls() {
    //   let balls = []
    //   let serialNumber = 0;
    //   // y座標
    //   for (let i = 0; i < 16; i++) {
    //     let y = []
    //     // x座標
    //     for (let j = 0; i < 10; j++) {
    //       let x = []
    //       let ballInfo = {
    //         ballClass: this.ballClass[Math.floor(Math.random() * this.ballClass.length)], // ランダムでボールの色をセット
    //         x: j, // x座標
    //         y: i, // y座標
    //         serialNumber: serialNumber, // 通し番号
    //         deleteFlag: 0,
    //       }

    //       x.push(ballInfo);
    //       serialNumber++;
    //     }

    //     y.push(x);
    //   }
      
    //   this.balls.push(y)
    // }
  },
  created() {
    // ballsに初期値をセット
    this.balls = this.getBalls
  },
}
</script>

<style scoped lang="scss">
// ヘッダー領域
.bubble-header {
  display: flex;
  width: 100%;
  .score {
    padding-top: 2%;
    margin: 1% 0;
    color: $base-text-color;
  }
  .bubble-title {
    margin: 1% auto;
    font-size: 25px;
    color: $base-text-color;
  }
  .replay {
    margin: 1% 1% 1% auto;
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
  border: solid 2px $base-text-color;
  border-radius: 7px;
  .grid {
    --grid-width:10;
    --grid-height:16;
    align-self: center;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(var(--grid-width),1fr);
    grid-template-rows: repeat(var(--grid-height),1fr);
    grid-gap: 1px;
    margin-top: 15px;
    flex: 1;
    padding: 3px;
    border-radius: 8px;
    grid-auto-columns: 1fr;
    position: relative;
    // 空ボール
    .ball {
      position: relative;
      margin: 0.5%;
      height: 24px;
      background-color: $base-bg-color;
      border: 2px solid $base-text-color;
      border-radius: 100%;
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
</style>