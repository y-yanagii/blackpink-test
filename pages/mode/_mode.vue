<!-- 難易度選択領域 -->
<template>
  <Start
    v-if="!show"
    @change-show="changeShow"
  ></Start>
  <Test
    v-else-if="show && playType === $modeNumber.test"
  ></Test>
  <Game
    v-else-if="show && playType === $modeNumber.game"
  ></Game>
  <Challenge
    v-else-if="show && playType === $modeNumber.challenge"
  ></Challenge>
  <Battle
    v-else-if="show && playType === $modeNumber.battle"
  ></Battle>
  
</template>

<script>
import Start from '~/components/ui/Start.vue';
import Test from '~/components/tests/Test.vue';
import Game from '~/components/games/Game.vue';
import Challenge from '~/components/challenges/Challenge.vue';
import Battle from '~/components/battles/Battle.vue';

export default {
  data: function() {
    return {
      // 初期表示はスタート画面のコンポーネント
      show: false,
      playType: this.$store.getters['localStorages/getPlayType']
    }
  },
  methods: {
    changeShow() {
      // テストかゲーム画面に切り替え
      this.show = true
    }
  },
  validate(context) {
    // urlチェック
    const modePath = ["easy", "normal", "hard", "master", "suddendeath", "music", "bubble", "puzzle", "1on1"]
    if (modePath.includes(context.params.mode)) return true
    
    // エラーページ（404）
    return false
  },
  components: {
    Start,
    Test,
    Game,
    Challenge,
    Battle,
  },
  async asyncData(context) {
    // ituensAPIで楽曲情報取得処理
    // 詳細はnuxt.config.jsのproxyを参照
    // const url = "/search";
    // const response = await context.$axios.$get(url, {
    //   params: {
    //     term: "blackpink",
    //     entity: "musicTrack"
    //   }
    // });

    // 他のアーティストも取れてきてしまうため一旦はK-Popで絞る
    // return { results: response.results.filter(n => n.primaryGenreName === "K-Pop") }
  },
}
</script>
