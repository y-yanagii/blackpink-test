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
          <div class="grid">
            <div
              v-for="(ball, index) in getBalls"
              :key="index"
              :class="ball.class"
              @click="ballBreak(ball)"
              class="ball"
            ></div>
          </div>
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
            class: this.ballClass[Math.floor(Math.random() * this.ballClass.length)],
            x: j,
            y: i,
            serialNumber: serialNumber,
            deleteFlag: 0,
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
  }
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