<template>
  <div class="text-center">
    <div class="youtube-video-list-title">
      <h3>DO YOU WANT TO LEARN ABOUT BLACKPINK?</h3>
    </div>
    <div class="youtube-list-area">
      <div
        v-for="(youtube, index) in youtubes"
        :key="index"
        class="youtube-video"
      >
        <youtube
          ref="youtube"
          :video-id="youtube.videoId"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // youtubeAPIで取得したチャンネル情報の中の動画情報
  props: ["youtubes"],
}
</script>

<style scoped lang="scss">
.youtube-video-list-title {
  margin: 6% auto 3% auto;
  h3 {
    color: $base-text-color;
  }
}

.youtube-list-area {
  width: 90%;
  margin: 5% auto;
}
</style>
