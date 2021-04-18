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
      newRecord: {
        name: "",
        answerIncorrectsArray: [],
        score: 0,
        modeType: "",
        clearTime: "",
        message: "",
        ranking: "",
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
      this.newRecord.answerIncorrectsArray.push(value);

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
      // 検定結果レコード作成
      this.setNewRecord();
      
      // ランキング情報を取得
      this.addAndGetRanking();
        // VuexのanswerInfoに登録処理
        // メッセージ取得処理
      // Vuexに解答結果を送信
      this.$store.dispatch('tests/setAnswerInfo', { newRecord: this.newRecord })
      // 検定結果画面に遷移
      debugger
      this.$router.push({ path: "/result" })
      debugger
    },
    // Newレコード情報をセット
    setNewRecord() {
      this.newRecord.name = localStorage.userName ? localStorage.userName : "No Name";
      this.newRecord.score = this.newRecord.answerIncorrectsArray.filter(n => n !== false).length * 10; // 正解数 * 10
      this.newRecord.clearTime = "07:00:000";
      this.newRecord.message = "💖🖤👑test message!👑🖤💖"  //VuexよりFirestoreから点数に応じて取得
      this.newRecord.modeType = this.$store.getters['mode/choiceMode'];
    },
    // ランキング情報を登録、取得
    addAndGetRanking() {
      // 登録前にドキュメントのIDを取得できるかも？？取れたら何位になるかを下のランキングリストよりとってこれる
      
      // ランキング登録
      this.rankingAdd()
      // 最新ランキング取得
      this.getRankings
      // this.newRecord.ranking = rankingId;
    },
    // ランキング登録
    rankingAdd() {
      this.$store.dispatch('rankings/add', this.newRecord);
    },
  },
  computed: {
    getRankings() {
      this.$store.getters['rankings/orderdRankings'];
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
