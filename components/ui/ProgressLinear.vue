<template>
  <div class="wait-bar">
    <div class="wait-text">＊Waiting for an opponent...</div>
    <v-progress-linear
      color="#f4a6b8"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </div>
</template>

<style scoped lang="scss">
.wait-text {
  color: $base-text-color;
  text-align: center;
}

.wait-bar {
  position: absolute;
  top: 50%;
  width: 60%;
}
</style>
