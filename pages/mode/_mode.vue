<!-- 難易度選択領域 -->
<template>
  <Start
    v-if="!show"
    @change-show="changeShow"
  ></Start>
  <Test
    v-else
  ></Test>
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
  validate(context) {
    // urlチェック
    const modePath = ["easy", "normal", "hard", "master", "suddendeath", "music", "bubble"]
    if (modePath.includes(context.params.mode)) return true
    
    // エラーページ（404）
    return false
  },
  components: {
    Start,
    Test
  },
  async asyncData(context) {
    // ituensAPIで楽曲情報取得処理
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
  },
}
</script>
