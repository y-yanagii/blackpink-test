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
            name="bubble"
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
            >{{ ball.serialNumber }}</div>
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

      // 削除対象を含めたballsのバックアップとballsから削除対象を削除
      const ballsBackUp = this.balls;
      // this.balls = this.balls.filter(b => b.deleteFlag !== this.$deleteFlag.delete);

      // 下方向への詰め処理
      this.ballDown(ballsBackUp, breakBalls);

      // 削除対象を削除済みにする
      for (let i = 0; i < this.balls.length; i++) { 
        if (this.balls[i].deleteFlag === this.$deleteFlag.delete) this.balls[i].deleteFlag = this.$deleteFlag.deleted;
      }

      // 右寄せ処理
      this.alignRight();

      // 得点計算
      this.scoreCalculation(breakBalls);

      // sortし直す
      // this.balls.sort((a, b) => a.serialNumber - b.serialNumber)
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
        this.balls[delBall.serialNumber].breakCheck = true;
        this.balls[delBall.serialNumber].className = "";

        // 起点を変え再度breakCheckRecursiveを呼び出す
        this.breakCheckRecursive(delBall, selectedClassName);
      }
    },
    ballDown(ballsBackUp, breakBalls) {
      // 落下対象のボールをindexの降順で取得（最後尾から落下させたい）
      let orderdBreakBalls = breakBalls.sort((a, b) => b.serialNumber - a.serialNumber);
      let xCoordinates = [];

      // 削除対象をループ
      for (let i = 0; i < orderdBreakBalls.length; i++) {
        // x軸方向へ既に落下処理済みの場合スキップ
        if (xCoordinates.includes(this.balls[orderdBreakBalls[i].serialNumber].x)) continue

        // 削除対象のボールを起点とし、y軸方向に検索をして落下対象のボールを取得
        let startBall = Object.assign({}, this.balls[orderdBreakBalls[i].serialNumber]);
        let topBall = undefined;

        while (typeof startBall !== "undefined") {
          // 1つ上のボールを取得(continueからきた場合を想定して1度undefinedチェック)
          topBall = this.getTopBall(topBall, startBall);
          // 空のオブジェクトの場合break
          if (!Object.keys(topBall).length || typeof topBall === "undefined") break;
          if (topBall.deleteFlag !== this.$deleteFlag.delete) {
            // 1つ上のボールが有色の場合、起点ボールに取り込む
            this.changeBall(startBall, topBall, true, orderdBreakBalls)
            // 起点ボールの情報を1つ上のボールに渡す
            this.changeBall(topBall, startBall, false)
          } else {
            // 1つ上のボールが削除対象ボールの場合、topBallを更に１つ上げて再処理
            topBall = Object.assign({}, this.balls[topBall.serialNumber - 10])
            continue
          }

          // startBallの１個上のボールを起点としループ
          startBall = Object.assign({}, this.balls[startBall.serialNumber - 10]);
          // 1つ上のボールオブジェクトを初期化
          topBall = undefined

          // topBallが削除対象のボールの場合スキップ。それ以外とstartBallが削除対象ボールの場合topとチェンジ
          // 最後削除は必要でバックアップを使えばいける？
        }

        // x軸方向へは1度だけ落下処理したいため処理済みのx方向を保持
        xCoordinates.push(this.balls[orderdBreakBalls[i].serialNumber].x)
      }
    },
    changeBall(ball1, ball2, startFlag, orderdBreakBalls) {
      // 起点ボールと1つ上のボールの情報を入れ替える
      this.balls[ball1.serialNumber].className = ball2.className;
      this.balls[ball1.serialNumber].deleteFlag = ball2.deleteFlag;
      this.balls[ball1.serialNumber].breakCheck = ball2.breakCheck;
      if (ball1.breakCheck && startFlag && orderdBreakBalls.some(obb => obb.serialNumber === ball1.serialNumber)) {
        // 削除対象ボールのみkeyを変更
        this.balls[ball1.serialNumber].primaryKey = Math.random().toString(32).substring(2);
      }
    },
    getTopBall(topBall, startBall) {
      // topBall取得処理
      if (typeof topBall === "undefined") {
        // （通常成立時）startBallから1つ上のボールを取得
        return Object.assign({}, this.balls[startBall.serialNumber - 10])
      } else if (!Object.keys(topBall).length) {
        // （不成立時）既存のtopBall位置から1つ上のボールを取得
        return Object.assign({}, this.balls[topBall.serialNumber - 10])
      } else {
        // topBall取得済み
        return topBall
      }
    },
    alignRight() {
      // 最下にあるx軸に有色が存在しなければ右寄せ（左端はスキップ）
      for (let i = (this.balls.length - 1); i >= 150; i--) {
        if (this.balls[i].deleteFlag !== this.$deleteFlag.display && i !== 150) {
          // y軸が全て空の場合かつ左端以外
          let leftIndex = i - 1;
          // 左隣の有色のxが取得できるまでループする
          while (leftIndex !== 150 && this.balls[leftIndex].deleteFlag !== this.$deleteFlag.display) {
            // 次の左隣のボールを取得しに行く
            leftIndex--;
          }

          // 左隣の縦列を全て右に+1する
          this.columnLeftToRight(leftIndex, i);
        }
      }
    },
    columnLeftToRight(leftIndex, index) {
      // 下から上(150 -> 0)に左隣のボール情報を右ボールに渡す
      const firstLeftIndex = leftIndex;

      for (let i=index; i>=0; i-=10) {
        let primaryKey = this.balls[i].primaryKey;
        this.balls[i].breakCheck = this.balls[leftIndex].breakCheck;
        this.balls[i].className = this.balls[leftIndex].className;
        this.balls[i].deleteFlag = this.balls[leftIndex].deleteFlag;
        this.balls[i].primaryKey = this.balls[leftIndex].primaryKey;
        this.balls[leftIndex].primaryKey = primaryKey; // primaryKeyが重複しないようにする
        leftIndex -= 10;
      }

      if (firstLeftIndex !== 150) {
        // 空白列と有色列を入れ替えたイメージのため右寄せのトリガー設定（次の右が空白列で無ければ右寄せにできないため）
        this.balls[firstLeftIndex].deleteFlag = this.$deleteFlag.deleted;
      } else {
        // 左端の列を空にする
        for (let i=firstLeftIndex; i>=0; i-=10) {
          this.balls[i].breakCheck = true;
          this.balls[i].className = "";
          this.balls[i].deleteFlag = this.$deleteFlag.deleted;
          this.balls[i].primaryKey = Math.random().toString(32).substring(2);
        }
      }
    },
    scoreCalculation(breakBalls) {
      // 得点計算
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
    cursor: pointer;
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

// バブルアニメーション
</style>