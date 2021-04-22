<template>
  <div>
    <div class="result-menu">
      <div class="result-retry-area">
        <v-btn
          class="result-footer-button"
          @click="toMode()"
        >
        <i class="mdi mdi-cached"/>RETRY</v-btn>
      </div>
      <div class="result-ranking-area">
        <v-btn
          class="result-footer-button"
          @click="toRanking()"
        >
        <i class="mdi mdi-crown-outline"/>RANKING</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toMode() {
      // nameが取得できなければ促すダイアログを表示
      this.$router.push({ path: "/mode" });
    },
    toRanking() {
      // nameが取得できなければ促すダイアログを表示
      this.$router.push({ path: "/ranking" });
    }
  }
}
</script>

<style scoped lang="scss">

.result-menu {
  margin: 2% auto;
  width: 90%;
  display: flex;
  .result-footer-button {
    background-color: $base-bg-color;
    border: solid 2px $base-text-color;
    color: $base-text-color;
    i {
      font-size: 17px;
    }
  }
  // RANKINGボタン領域
  .result-ranking-area {
    margin: 0 0 0 auto; // 右寄せ
  }
}
</style>
