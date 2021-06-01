<template>
  <div class="text-center">
    <div class="question-no">Q. {{ questionNo + 1 }}</div>
  </div>
</template>

<script>
export default {
  props: ["questionNo"],
  mounted() {
    // 2秒間表示
    setTimeout(() => {
      // 表示制御
      this.$emit('display-control');
    }, 1000)
  },
}
</script>

<style scoped lang="scss">
.question-no {
  margin: 10% auto;
  width: 100%;
  font-size: 30px;
  color: $base-text-color;
}
</style>
