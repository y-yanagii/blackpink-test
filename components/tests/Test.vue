<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time
          v-show="selectedMode.modeType !== $mode.suddendeath"
          :timerObject="timerObject"
        ></Time>
        <TestCard
          :currentTest="currentTest"
          :test="tests[currentTest]"
          :testTotal="tests.length"
          ref="test_card"
          @option-click="addAnswer"
        ></TestCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ui/ModeTitle.vue';
import Time from '~/components/ui/Time.vue';
import TestCard from '~/components/tests/TestCard.vue';
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      currentTest: 0,
      tests: this.$store.getters['tests/getTestsByMode'](this.$store.getters['localStorages/choiceMode'].modeType),
      newRecord: {
        name: "",
        twitterId: "",
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
      selectedMode: this.$store.getters['localStorages/choiceMode'],
    }
  },
  computed: {
    // 取得したテストコレクションをシャッフルかつ10件にする
    processingTests: function() {
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
      if (this.selectedMode.modeType === this.$mode.suddendeath) return

      // シャッフル後、最初の10件をテスト問題とする
      this.tests = this.tests.slice(0, 10);
    },
  },
  components: {
    ModeTitle,
    Time,
    TestCard,
  },
  methods: {
    // 選択肢押下時処理(解答時)
    addAnswer(value) {
      // 選択した解答を配列に保持（正誤かをtrue、falseで判断）
      this.newRecord.answerIncorrectsArray.push(value);

      if (this.currentTest === this.tests.length - 1) {
        // 最終問題の場合終了処理
        this.testEndProcessing();
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

      // 自分のランクをセット
      this.setMyRank();

      // メッセージをセット
      this.setMessage();

      // VuexのnewRecordに登録処理
        // メッセージ取得処理
      // Vuexに解答結果と今回のテスト内容を送信し保持
      this.$store.dispatch('localStorages/setNewRecord', { newRecord: this.newRecord });
      this.$store.dispatch('localStorages/setTargetTests', this.tests);
      // 検定結果画面に遷移
      this.$router.push({ path: "/result" })
    },
    stopTimer() {
      // タイマーストップ処理
      // タイマーの初期化
      let vm = this.timerObject;
      vm.isRunning = false;
      // 実際のタイマーストップ処理
      cancelAnimationFrame(vm.animateFrame);
    },
    // Newレコード情報をセット
    setNewRecord() {
      this.newRecord.name = this.$store.getters['localStorages/getUserName'] ? this.$store.getters['localStorages/getUserName'] : this.$user.defaultName; // ブラウザのローカルストレージより取得
      this.newRecord.twitterId = this.$store.getters['localStorages/getTwitterId'] ? this.$store.getters['localStorages/getTwitterId'] : ""; // ローカルストレージよりTwitterId取得
      this.newRecord.score = this.newRecord.answerIncorrectsArray.filter(n => n.isAnswer !== false).length * 10; // 正解数 * 10
      this.newRecord.modeType = this.selectedMode.modeType;
      this.newRecord.modeValue = this.selectedMode.modeValue;
      this.newRecord.clearTime = this.$options.filters.replaceClearTimeWithNumber(document.getElementById("time").textContent.trim()); // クリアタイム(mm:ss.fff)をフォーマットし、オブジェクトにセット
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
      this.newRecord.myRank = rankings.indexOf(rankings.find(ranking => ranking.id === this.$user.defaultRankId)) + 1;
      // 20位以内の場合のみ、ランキングを登録
      if (this.newRecord.myRank <= 20) this.addRanking();
    },
    // ランキング情報を登録、取得
    addRanking() {
      // ランキング登録
      this.$store.dispatch('rankings/add', this.newRecord);
    },
    setMessage() {
      // ランクごとのメッセージをセット
      this.newRecord.message = this.$store.getters['messages/getMessage'](this.newRecord.myRank)
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

    // 取得したテストコレクションをシャッフルかつ10件にする
    this.processingTests;
  },
}
</script>
