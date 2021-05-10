<template>
  <!-- EndOfGameダイアログ -->
  <v-dialog
    v-model="isDisplay"
    max-width="550px"
  >
    <v-card class="end-game-card">
      <div class="end-game-header">
        <div class="to-mode">
          <v-btn
            class="to-header-btn"
            @click="toMode()"
            icon
          >
            <v-icon>mdi-gamepad-variant-outline</v-icon>
          </v-btn>
        </div>
        <div class="to-retry">
          <v-btn
            class="to-header-btn"
            @click="$emit('retry')"
            icon
          >
            <v-icon>mdi-sync</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="end-of-game">
        <div class="end-of-game-text">END OF {{ gameName }} GAME</div>
        <div class="ball-area">
          <div class="ball jennie"></div>
          <div class="ball jisoo"></div>
          <div class="ball rose"></div>
          <div class="ball lisa"></div>
        </div>
      </div>
      <div class="game-record">
        <div>
          {{ message }}
        </div>
        <div>
          SCORE： {{ score }}
        </div>
      </div>
      <div class="end-game-footer">
        <div class="sns-share-area">
          <v-btn
            :href="sns.twitter"
            target="_blank"
          ><i class="mdi mdi-twitter" />Share</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isDisplay: false,
      sns:{
        twitter:'https://twitter.com/intent/tweet?url=https://yahoo.co.jp&text=GAME結果は&hashtags=BLACKPINK,ブラックピンク,BLINK,BLACKPINKTEST',
      },
    }
  },
  props: ["message", "score", "gameName"],
  watch: {
    isDisplay(flag) {
      if (!flag) this.$emit('retry');
    }
  }
}
</script>

<style scoped lang="scss">
.end-game-card {
  height: 100%;
  background-color: $base-bg-color;
  border: solid 2px $base-text-color;
  // ヘッダー
  .end-game-header {
    margin: 2% auto;
    width: 100%;
    display: flex;
    .to-header-btn {
      background-color: $base-bg-color;
      color: $base-text-color;
      i {
        font-size: 27px;
      }
    }
    // homeボタン領域
    .to-mode {
      margin: 0 0 0 3%;
    }
    // retryボタン領域を右寄せ
    .to-retry {
      margin: 0 3% 0 auto; // 右寄せ
    }
  }

  // END OF GAMEタイトル
  .end-of-game {
    margin: 5% 0%;
    .end-of-game-text {
      text-align: center;
      color: $base-text-color;
      font-size: 21px;
      padding-right: 3%;
    }
    .ball-area {
      text-align: center;
      height: 40px;

      .ball {
        display: -webkit-inline-box;
        margin: 0.5%;
        width: 10%;
        height: 71%;
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

  // メッセージ、スコア領域
  .game-record {
    font-size: 19px;
    padding: 3%;
    text-align: center;
    div {
      color: $base-text-color;
      margin-bottom: 3%;
    }
  }

  // フッター領域
  .end-game-footer {
    text-align: center;
    // Twiiterシェア領域
    .sns-share-area {
      margin-bottom: 5%;
      a {
        border: solid 2px #3298dc;
        color: #3298dc;
        background-color: black;
      }
    }
  }
}
</style>
