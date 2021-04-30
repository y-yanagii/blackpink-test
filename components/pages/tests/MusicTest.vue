<template>
  <div class="music">
    <img :src="imageSrc" class="music-icon">
    <div class="replay">
      <v-btn
        class="replay-btn"
      >
        <i class="mdi mdi-headphones"></i>
        REPLAY
      </v-btn>
      <audio>
        <source :src="audio" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: require("~/assets/images/music-icon.png")
    }
  },
  props: ["test", "audio"],
}
</script>

<style scoped lang="scss">
// replayボタン
.replay-btn{
  color: $text-color-black;
  background-color: $base-text-color !important;
  border: solid 2px $base-text-color;
}
</style>