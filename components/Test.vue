<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <!-- <Time
          v-show="localModeType !== $mode.suddendeath.toString()"
          :timerObject="timerObject"
        ></Time> -->
        <Life
          v-show="localModeType === $mode.suddendeath.toString()"
          :lives="lives"
        ></Life>
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
import Life from '~/components/Life.vue';

export default {
  data: function() {
    return {
      currentTest: 0,
      tests: this.$store.getters['tests/getTestsByMode'](localStorage.localModeType),
      newRecord: {
        name: "",
        answerIncorrectsArray: [],
        score: 0,
        modeType: "",
        clearTime: 0,
        message: "",
        myRank: "",
      },
      timerObject: {
        animateFrame: 0, // requestAnimationFrame(cd)の返り値(requestID)が入る
        nowTime: 0, // 現在時刻
        diffTime: 0, // 現在時刻とスタートボタンを押した時刻の差
        startTime: 0, // スタートボタンを押した時刻
        isRunning: false // 計測中の状態保持
      },
      remainingLife: 3, // 残ライフ
      lives: [ // ライフオブジェクト
        {
          life: true,
          icon: "mdi-heart-outline",
          color: "#f4a6b8",
        },
        {
          life: true,
          icon: "mdi-heart-outline",
          color: "#f4a6b8",
        },
        {
          life: true,
          icon: "mdi-heart-outline",
          color: "#f4a6b8",
        },
      ],
      localModeType: Number
    }
  },
  computed: {
    // 難易度別にテスト情報取得
    getTests: function() {
      return this.$store.getters['tests/getTestsByMode'](localStorage.localModeType);
    },
  },
  components: {
    ModeTitle,
    Time,
    TestCard,
    Life
  },
  methods: {
    // 選択肢押下時処理(解答時)
    addAnswer(value) {
      // 選択した解答を配列に保持（正誤かをtrue、falseで判断）
      this.newRecord.answerIncorrectsArray.push(value);

      if (this.currentTest === this.tests.length - 1) {
        // 最終問題の場合終了処理
        this.testEndProcessing();
      } else if (this.localModeType === this.$mode.suddendeath.toString()) {
        // sudden deathの場合ライフの判定
        this.judgmentLife(value);
      } else {
        // 次の問題に移行
        this.currentTest++
      }
    },
    // 終了処理
    testEndProcessing() {
      // タイマーストップ処理
      this.stopTimer();

      // 検定結果レコード作成
      this.setNewRecord();
      
      // ランキング情報を取得
      this.addAndGetRanking();
      // VuexのnewRecordに登録処理
        // メッセージ取得処理
      // Vuexに解答結果を送信
      this.$store.dispatch('tests/setNewRecord', { newRecord: this.newRecord })
      // 検定結果画面に遷移
      this.$router.push({ path: "/result" })
    },
    // Newレコード情報をセット
    setNewRecord() {
      this.newRecord.name = localStorage.userName ? localStorage.userName : "no_name"; // ブラウザのローカルストレージより取得
      this.newRecord.score = this.newRecord.answerIncorrectsArray.filter(n => n.isAnswer !== false).length * 10; // 正解数 * 10
      const selectedMode = this.$store.getters['modes/choiceMode']
      this.newRecord.modeType = selectedMode.modeType;
      this.newRecord.modeValue = selectedMode.modeValue;
      this.newRecord.clearTime = this.$options.filters.replaceClearTimeWithNumber(document.getElementById("time").textContent.trim()); // クリアタイム(mm:ss.fff)をフォーマットし、オブジェクトにセット
      this.newRecord.message = "💖🖤👑test message!👑🖤💖"; // VuexよりFirestoreから点数に応じて取得
    },
    // ランキング情報を登録、取得
    addAndGetRanking() {
      // ランキング登録
      this.rankingAdd()
      // 最新ランキング取得
      this.getRankings
    },
    // ランキング登録
    rankingAdd() {
      this.$store.dispatch('rankings/add', this.newRecord);
    },
    // タイマーストップ処理
    stopTimer() {
      // タイマーの初期化
      let vm = this.timerObject;
      vm.isRunning = false;
      // 実際のタイマーストップ処理
      cancelAnimationFrame(vm.animateFrame);
    },
    judgmentLife(answer) {
      if (!answer.isAnswer) {
        // 不正解の場合、ライフを１削る
        this.lives.filter(l => l.life)[this.lives.filter(l => l.life).length - 1].icon = "mdi-heart-broken-outline"
        this.lives.filter(l => l.life)[this.lives.filter(l => l.life).length - 1].life = false
        this.remainingLife--;
      }
      
      if (this.remainingLife === 0) {
        // 残ライフが0の場合、検定終了(最終問題の場合はaddAnswerメソッドのif文で処理される)
        this.testEndProcessing();
      } else {
        // 次の問題に移行
        this.currentTest++
      }
    }
  },
  computed: {
    getRankings() {
      return this.$store.getters['rankings/orderdRankings'];
    }
  },
  filters: {
    // フォーマット整形
    replaceClearTimeWithNumber: function(value) {
      // タイマーの「:」と「.」を削除しNumber型に変換する
      return Number(value.replace(/:/g, '').replace(/\./g, ''));
    }
  },
  created() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
  mounted() {
    if (localStorage.localModeType) {
      this.localModeType = localStorage.localModeType
    }
  }
}
</script>
