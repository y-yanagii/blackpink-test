<!-- EndOfGameダイアログ -->
<template>
  <v-dialog
    v-model="isDisplay"
    max-width="550px"
  >
    <v-card class="end-game-card">
      <div class="end-game-header">
        <div class="to-ranking">
          <v-btn
            class="to-header-btn"
            @click="$emit('to-ranking')"
            icon
          >
            <v-icon>mdi-crown-outline</v-icon>
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
        <div
          v-if="selectedMode.modeType === $mode.bubble"
          id="random-balls"
          class="ball-area">
          <div class="ball jennie" :class="ballFontSize">🐻</div>
          <div class="ball jisoo" :class="ballFontSize">🐰</div>
          <div class="ball rose" :class="ballFontSize">🌹</div>
          <div class="ball lisa" :class="ballFontSize">🐱</div>
        </div>
        <div
          v-else-if="selectedMode.modeType === $mode.puzzle"
          class="puzzle-area"
        >
          <div class="puzzle-peace">
            <v-icon class="jennie-puzzle">mdi-puzzle</v-icon>
          </div>
          <div class="puzzle-peace">
            <v-icon class="jisoo-puzzle">mdi-puzzle</v-icon>
          </div>
          <div class="puzzle-peace">
            <v-icon class="rose-puzzle">mdi-puzzle</v-icon>
          </div>
          <div class="puzzle-peace">
            <v-icon class="lisa-puzzle">mdi-puzzle</v-icon>
          </div>
        </div>
      </div>
      <div class="game-record">
        <div class="message">
          {{ message }}
        </div>
        <div>
          {{ resultStr }}
        </div>
      </div>
      <div class="end-game-footer">
        <div class="sns-share-area">
          <v-btn
            :href="snsTwitter"
            target="_blank"
          ><i class="mdi mdi-twitter" />Share</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      isDisplay: false,
      selectedMode: this.$store.getters['localStorages/choiceMode'],
      ballFontSize: this.$vuetify.breakpoint.xs ? "xs-font" : "font",
    }
  },
  props: ["message", "resultStr", "gameName"],
  computed: {
    snsTwitter() {
      // Twitterシェアの文言を設定
      const urlStr = "https://twitter.com/intent/tweet?url=https://blink-games.app%0a";
      const textStr = "&text=BLINK GAMES (" + this.gameName + ") 結果は...%0a" + this.resultStr + "%0a" + this.message + "%0a%0a" + '&hashtags=BLINKGAMES%0a,BLACKPINK,ブラックピンク%0a,BLINK,ブリンク';
      return urlStr + textStr;
    }
  },
  watch: {
    isDisplay(flag) {
      // ダイアログ外を押下した場合のリプレイ処理は一旦コメントアウト
      // if (!flag) this.$emit('retry');
    },
  },
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
    .to-ranking {
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
    // BUBBLEゲーム用
    .ball-area {
      text-align: center;
      height: 40px;

      .ball {
        display: inline-grid;
        margin: 0.5%;
        width: 10%;
        height: 71%;
        border-radius: 100%;
      }
      .xs-font {
        font-size: 17px;
      }
      .font {
        font-size: 21px;
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
    // PUZZLEゲーム用
    .puzzle-area {
      text-align: center;
      div {
        display: -webkit-inline-box;
        margin: 0.5%;
      }
      .lisa-puzzle {
        color: $ball-green-color;
      }
      .jennie-puzzle {
        color: $ball-red-color;
      }
      .rose-puzzle {
        color: $ball-orange-color;
      }
      .jisoo-puzzle {
        color: $ball-purple-color;
      }
    }
  }

  // メッセージ、スコア領域
  .game-record {
    font-size: 19px;
    padding: 3%;
    text-align: center;
    div {
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

.message {
  white-space: pre-line;
}
</style>
