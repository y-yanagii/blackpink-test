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
      // 選択した結果を解答を配列に保持（正か誤かをtrue、falseで判断）
      this.answers.push(value)
      // 次のクイズに切り替え
      this.currentTest++
      debugger
      if (this.currentTest === this.tests.length - 1) {
        // 最終問題の場合、結果表示処理に移行
      } else {
        // 次の問題に移行
      }
    }
  },
  created() {
    // tests情報の初期化
    this.$store.dispatch('tests/init');
  }
}
</script>
