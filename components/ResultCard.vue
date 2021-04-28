<template>
  <div class="text-center">
    <div class="result-card">
      <!-- タイトル領域 -->
      <div class="text-center result-card-title">
        <p>CONGRATULATIONS！<br>BLACKPINK TEST({{ this.newRecord.modeValue }})</p>
      </div>
      <!-- 結果情報領域 -->
      <div class="text-center result-area">
        <div class="result-inline-area record-0" key="rank">
          <div class="result-label">RANK</div>
          <div class="result-value">{{ this.newRecord.myRank }}</div>
        </div>
        <div class="result-inline-area record-1" key="score">
          <div class="result-label">SCORE</div>
          <div class="result-value">{{ this.newRecord.score }}</div>
        </div>
        <div class="result-inline-area record-2" key="clearTime">
          <div class="result-label">CLEAR TIME</div>
          <div class="result-value">{{ this.newRecord.clearTime | zeroPadAndFormat }}</div>
        </div>
      </div>
      <!-- メッセージ領域 -->
      <div class="result-message-area">
        <p>{{ this.newRecord.message }}</p>
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
export default {
  data() {
    return {
      sns:{
        twitter:'https://twitter.com/intent/tweet?url=https://yahoo.co.jp&text=TEST結果は&hashtags=BLACKPINK,ブラックピンク,BLINK,BLACKPINKTEST',
      },
    }
  },
  props: ["newRecord"],
  filters: {
    // フォーマット整形
    zeroPadAndFormat: function(value) {
      // クリアタイムを０埋めし、mm:ss.fffに変換
      const clearTime = value.toString().padStart(7, "0");
      const mm = clearTime.slice(0, 2);
      const ss = clearTime.slice(2, 4);
      const fff = clearTime.slice(4, 7);
      return mm + ":" + ss + "." + fff;
    }
  },
}
</script>

<style scoped lang="scss">
.result-card {
  margin: 8% auto 2% auto;
  width: 90%;
  height: 100%;
  border: solid 2px $base-text-color;
  border-radius: 7px;
  .result-card-title {
    p {
      font-size: 18px;
      margin-top: 3%;
      color: $base-text-color;
    }
  }
  // テスト結果情報領域
  .result-area {
    width: 85%;
    margin: auto;
    .result-inline-area{
      margin-bottom: 3%;
      border-bottom: solid 2px $base-text-color;
      div {
        // 共通div（ラベルと結果情報）
        display: inline-block;
        width: 47%;
      }
      .result-label {
        text-align: left;
        padding-left: 3%;
      }
      .result-value {
        text-align: right;
        padding-right: 3%;
      }
    }
  }
  // メッセージ領域
  .result-message-area {
    margin: 8% auto 0% auto;
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
</style>
