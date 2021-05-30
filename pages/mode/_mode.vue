<!-- 難易度選択領域 -->
<template>
  <Start
    v-if="!show"
    @change-show="changeShow"
  ></Start>
  <Test
    v-else-if="show && playType === $modeNumber.test"
    :tests="tests"
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
      playType: this.$store.getters['localStorages/getPlayType'],
      tests: [],
    }
  },
  methods: {
    changeShow(value) {
      if (this.playType === this.$modeNumber.test) {
        // テスト取得
        this.tests = this.$store.getters['tests/getTestsByMode'](this.$store.getters['localStorages/choiceMode'].modeType);
        this.processingTests();
      }
      // テストかゲーム画面に切り替え
      this.show = true
    },
    processingTests() {
      // 取得したテストコレクションをシャッフルかつ10件にする
      // 問題をシャッフル
      for (let i = (this.tests.length - 1); 0 < i; i--) {
        // ランダムで要素数1つを取得
        let r = Math.floor(Math.random() * (i + 1));

        // 並び替え
        let tmp = this.tests[i];
        this.tests[i] = this.tests[r];
        this.tests[r] = tmp
      }

      // サドンデスの場合はシャッフルのみ
      if (this.$store.getters['localStorages/choiceMode'].modeType === this.$mode.suddendeath) return

      // シャッフル後、最初の10件をテスト問題とする
      this.tests = this.tests.slice(0, 10);
    },
  },
  created() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
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
