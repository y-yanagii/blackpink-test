<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time></Time>
        <TestCard
          :currentTest="currentTest"
          :test="tests[currentTest]"
          ref="test_card"
          @option-click="addAnswer"
        ></TestCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ModeTitle.vue';
import Time from '~/components/Time.vue';
import TestCard from '~/components/TestCard.vue';

export default {
  data: function() {
    return {
      currentTest: 0,
      tests: this.$store.getters['tests/getTestsByMode'],
      answers: [],
      clearTime: "00:00:000",
      rankings: [],
      newRecord: {
        name: "",
        score: 0,
        clearTime: "",
      },
    }
  },
  computed: {
    // 難易度別にテスト情報取得
    getTests: function() {
      return this.$store.getters['tests/getTestsByMode'];
    },
  },
  components: {
    ModeTitle,
    Time,
    TestCard
  },
  methods: {
    // 選択肢押下時処理(解答時)
    addAnswer(value) {
      // 選択した解答を配列に保持（正誤かをtrue、falseで判断）
      this.answers.push(value)

      if (this.currentTest === this.tests.length - 1) {
        // タイマーストップ処理
        // 最終問題の場合終了処理
        this.testEndProcessing();
      } else {
        // 次の問題に移行
        this.currentTest++
      }
    },
    // 終了処理
    testEndProcessing() {
      // ランキング登録
      this.rankingAdd();
      // ランキング情報を取得
      this.rankings = this.$store.getters['rankings/orderdRankings'];
      // rankingsコレクションの初期化
      this.$store.dispatch('rankings/init');
      // 新規のテスト情報をリストに追加しSortする
      // 100以内の場合ランキングに登録、それ以外ランク外
        // VuexのanswerInfoに登録処理
        // メッセージ取得処理
      // Vuexに解答結果を送信
      this.$store.dispatch('tests/setAnswerInfo', { answers: this.answers, clearTime: this.clearTime })
      // 検定結果画面に遷移
      this.$router.push({ path: "/result" })
    },
    // ランキング登録
    rankingAdd() {
      this.$store.dispatch('rankings/add', this.newRecord);
    }
  },
  created() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  }
}
</script>
