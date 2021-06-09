<template>
  <div class="text-center">
    <div class="text-center game-title">
      BLINK GAMES(1ON1)
    </div>
    <div class="result-card">
      <!-- タイトル領域 -->
      <div class="text-center result-card-title">
        <p v-if="battleResult == $answerJudgment.win">CONGRATULATIONS！</p>
        <p v-else-if="battleResult == $answerJudgment.lose">Oh...</p>
        <p v-else>One more time?</p>
      </div>
      <!-- 結果情報領域 -->
      <div class="text-center result-area">
        {{ (battleResult === $answerJudgment.lose) ? 'YOU ' + battleResult.toUpperCase() + '...' : 'YOU ' + battleResult.toUpperCase() + '！'  }}
      </div>
      <!-- vs領域 -->
      <div class="vs">
        <v-avatar
          v-if="!$store.getters['localStorages/getGuestPlay']"
          size="56"
        >
          <v-img
            :lazy-src="user.photoURL"
            max-height="150"
            max-width="250"
            :src="user.photoURL"
          ></v-img>
        </v-avatar>
        <!-- ゲストモード時 -->
        <v-avatar
          v-else
          size="56"
          color="#f4a6b8"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <div>VS</div>
        <v-avatar
          size="56"
          color="#ee82ee"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </div>
      <!-- フッター領域 -->
      <div class="result-footer-area">
        <div class="sns-share-area">
          <v-btn
            :href=snsTwitter
            target="_blank"
          ><i class="mdi mdi-twitter"/>Share
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({ user: "users/getCurrentUser" }),
    snsTwitter() {
      // Twitterシェアの文言を設定
      const resStr = (this.battleResult === this.$answerJudgment.lose) ? 'YOU ' + this.battleResult.toUpperCase() + '...' : 'YOU ' + this.battleResult.toUpperCase() + '！';
      let message = "";
      if (this.battleResult == this.$answerJudgment.win) {
        message = "CONGRATULATIONS！💖🖤👑";
      } else if (this.battleResult == this.$answerJudgment.lose) {
        message = "Oh...";
      } else {
        message = "One more time?";
      }

      const urlStr = "https://twitter.com/intent/tweet?url=https://blackpink-test.web.app%0a";
      const textStr = "&text=BLINK GAMES(1ON1) 結果は...%0a" + resStr + "%0a" + message + "%0a%0a" + '&hashtags=BLINKGAMES%0a,BLACKPINK,ブラックピンク%0a,BLINK,ブリンク';
      return urlStr + textStr;
    }
  },
  props: ["battleResult"],
}
</script>

<style scoped lang="scss">
.game-title {
  width: 100%;
  margin: 10px auto;
  color: $oneonone-color;
  font-size: 25px;
}

.result-card {
  margin: auto auto 2% auto;
  width: 90%;
  height: 100%;
  border: solid 2px $oneonone-color;
  border-radius: 7px;
  .result-card-title {
    p {
      font-size: 18px;
      margin-top: 3%;
      color: $oneonone-color;
    }
  }
  // テスト結果情報領域
  .result-area {
    font-size: 50px;
    width: 100%;
    margin: auto;
    color: $oneonone-color;
  }
  // フッター領域
  .result-footer-area {
    // Twiiterシェア領域
    .sns-share-area {
      margin: 5% auto;
      a {
        border: solid 2px #3298dc;
        color: #3298dc;
        background-color: black;
      }
    }
  }
}

.vs {
  display: flex;
  width: 100%;
  color: $oneonone-color;
  div {
    margin: auto;
  }
}
</style>
