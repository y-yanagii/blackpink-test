<!-- 難易度選択領域 -->
<template>
<div>
  <Start
    v-if="!show"
    @change-show="changeShow"
  >
  </Start>
  <Test v-else></Test>
  <div
    v-for="(result, index) in results"
    :key="index"
  >
    <div>
      <div>artistName : {{ result.artistName }}</div>
      <div>trackName : {{ result.trackName }}</div>
      <div>previewUrl : {{ result.previewUrl }}</div>
      <audio controls preload="auto" id="audio">
        <source
          :src=result.previewUrl
          type="audio/mp4"
        />
      </audio>
      
    </div>
  </div>
</div>
</template>

<script>
import Start from '~/components/Start.vue';
import Test from '~/components/Test.vue';

export default {
  data: function() {
    return {
      // 初期表示はスタート画面のコンポーネント
      show: false,
    }
  },
  methods: {
    changeShow() {
      // 検定画面に切り替え
      this.show = true
    }
  },
  components: {
    Start,
    Test
  },
  async asyncData(context) {
    // 詳細はnuxt.config.jsのproxyを参照
    const url = "/search";
    const response = await context.$axios.$get(url, {
      params: {
        term: "blackpink",
        entity: "musicTrack"
      }
    });

    // 他のアーティストも取れてきてしまうため一旦はK-Popで絞る
    return { results: response.results.filter(n => n.primaryGenreName === "K-Pop") }
  } 
}
</script>
