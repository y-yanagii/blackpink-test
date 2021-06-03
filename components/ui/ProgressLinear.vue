<template>
  <div class="wait-bar">
    <div class="wait-bar-area">
      <div class="wait-text">
        ＊対戦相手を待っています...
      </div>
      <v-progress-linear
        color="#ff7594"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
    <div class="danger-message">
      ＊リロードしないでください。
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>


<style scoped lang="scss">
.wait-bar {
  width: 100%;
  .wait-bar-area {
    margin: 45% auto;
    width: 65%;
    .wait-text {
      color: $base-text-color;
      text-align: center;
    }
  }
  .danger-message {
    position: absolute;
    top: 300%;
    text-align: center;
    width: 100%;
    color: red;
  }
}
</style>
