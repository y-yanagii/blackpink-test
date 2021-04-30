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
      imageSrc: require("~/assets/images/music-icon.png"),
    }
  },
  props: ["test", "audio"],
  created() {
    this.audio.volume = 1.0
    this.audio.play()
  },
  watch: {
    // watchで監視し、次の問題に移行時audioオブジェクトを新たに生成する
    audio(newAudio) {
      // 新しいaudioオブジェクトを代入し曲を流す
      this.audio = newAudio
      this.audio.volume = 1.0
      this.audio.play()
    }
  },
  destroyed() {
    // musicクイズの終了時
    this.audio.pause();
  }
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
