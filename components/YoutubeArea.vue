<template>
  <div class="text-center">
    <div class="youtube-list-area">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="youtube-video"
      >
        <youtube
          ref="youtube"
          :video-id="item.id.videoId"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // youtubeAPIで取得したチャンネル情報の中の動画情報
  props: ["items"],
}
</script>

<style scoped lang="scss">
.youtube-list-area {
  width: 90%;
  margin: 5% auto;
}
</style>
