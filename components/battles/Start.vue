<template>
  <div class="text-center">
    <div class="start">START!</div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 2秒間表示
    setTimeout(() => {
      // 表示制御
      this.$emit('display-control');
    }, 2000)
  },
}
</script>

<style scoped lang="scss">
.start {
  margin: 10% auto;
  width: 100%;
  font-size: 30px;
  color: $base-text-color;
}
</style>
