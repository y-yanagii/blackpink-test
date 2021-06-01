<template>
  <div class="text-center">
    <div class="text-center game-title">
      1ON1
    </div>
    <div class="result-card">
      <!-- タイトル領域 -->
      <div class="text-center result-card-title">
        <p v-if="battleResult == $answerJudgment.win">CONGRATULATIONS！</p>
        <p v-else-if="battleResult == $answerJudgment.lose">Oh...</p>
        <p v-else>RETRY?</p>
      </div>
      <!-- 結果情報領域 -->
      <div class="text-center result-area">
        {{ (battleResult === $answerJudgment.lose) ? 'YOU ' + battleResult.toUpperCase() + '...' : 'YOU ' + battleResult.toUpperCase() + '！'  }}
      </div>
      <!-- vs領域 -->
      <div class="vs">
        <v-avatar
          size="56"
        >
          <v-img
            :lazy-src="user.photoURL"
            max-height="150"
            max-width="250"
            :src="user.photoURL"
          ></v-img>
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
            :href=sns.twitter
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
      sns:{
        twitter:'https://twitter.com/intent/tweet?url=https://yahoo.co.jp&text=TEST結果は&hashtags=BLACKPINK,ブラックピンク,BLINK,BLACKPINKTEST,BLINKTEST',
      },
    }
  },
  computed: {
    ...mapGetters({ user: "users/getCurrentUser" }),
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
