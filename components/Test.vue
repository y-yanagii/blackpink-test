<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time
          v-show="selectedMode.modeType !== $mode.suddendeath.toString()"
          :timerObject="timerObject"
        ></Time>
        <Life
          v-show="selectedMode.modeType === $mode.suddendeath.toString()"
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
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      currentTest: 0,
      tests: this.$store.getters['tests/getTestsByMode'](this.$store.getters['localStorages/choiceMode'].modeType),
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
      selectedMode: this.$store.getters['localStorages/choiceMode'],
    }
  },
  computed: {
    // 難易度別にテスト情報取得
    getTests: function() {
      return this.$store.getters['tests/getTestsByMode'](this.selectedMode.modeType);
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
      } else if (this.selectedMode.modeType === this.$mode.suddendeath.toString()) {
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
      this.addRanking();

      // 自分のランクをセット
      this.setMyRank();

      // VuexのnewRecordに登録処理
        // メッセージ取得処理
      // Vuexに解答結果を送信し保持
      this.$store.dispatch('tests/setNewRecord', { newRecord: this.newRecord })
      // 検定結果画面に遷移
      this.$router.push({ path: "/result" })
    },
    // Newレコード情報をセット
    setNewRecord() {
      this.newRecord.name = this.$store.getters['localStorages/getUserName'] ? this.$store.getters['localStorages/getUserName'] : this.$user.defaultName; // ブラウザのローカルストレージより取得
      this.newRecord.score = this.newRecord.answerIncorrectsArray.filter(n => n.isAnswer !== false).length * 10; // 正解数 * 10
      this.newRecord.modeType = this.selectedMode.modeType;
      this.newRecord.modeValue = this.selectedMode.modeValue;
      this.newRecord.clearTime = this.$options.filters.replaceClearTimeWithNumber(document.getElementById("time").textContent.trim()); // クリアタイム(mm:ss.fff)をフォーマットし、オブジェクトにセット
      this.newRecord.message = "💖🖤👑test message!👑🖤💖"; // VuexよりFirestoreから点数に応じて取得
    },
    // ランキング情報を登録、取得
    addRanking() {
      // ランキング登録
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
    },
    setMyRank() {
      // モード種別ごとのランキングを取得
      let rankings = this.$store.getters['rankings/rankingsByModeType'](this.selectedMode.modeType)
      
      // 今回の結果のオブジェクトをランキング配列に追加
      const myRankObject = {
        id: this.$user.defaultRankId,
        score: this.newRecord.score,
        clearTime: this.newRecord.clearTime,
        createdAt: this.$store.getters['rankings/serverTime']
      }
      rankings.push(myRankObject);

      // ランキングソート
      rankings.sort(function(a, b) {
        // scoreの降順
        if (a.score !== b.score) {
          return (a.score - b.score) * -1
        }

        // clearTimeの昇順
        if (a.clearTime !== b.clearTime) {
          return a.clearTime - b.clearTime
        }

        // createdAtの降順
        if (a.createdAt !== b.createdAt) {
          return (a.createdAt - b.createdAt) * -1
        }
      });

      // 今回のランクをセット
      this.newRecord.myRank = rankings.indexOf(rankings.find(ranking => ranking.id === this.$user.defaultRankId)) + 1
    },
  },
  filters: {
    // フォーマット整形
    replaceClearTimeWithNumber: function(value) {
      // タイマーの「:」と「.」を削除しNumber型に変換する
      return Number(value.replace(/:/g, '').replace(/\./g, ''));
    }
  },
  mounted() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
}
</script>
