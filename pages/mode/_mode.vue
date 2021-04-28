<!-- 難易度選択領域 -->
<template>
  <Start
    v-if="!show"
    @change-show="changeShow"
  >
  </Start>
  <Test v-else></Test>
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
    const url = "https://itunes.apple.com/search";
    const response = await context.$axios.$get(url);
    debugger
  } 
}
</script>
