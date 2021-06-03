<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time
          v-show="selectedMode.modeType !== $mode.suddendeath"
          :timerObject="timerObject"
        ></Time>
        <Life
          v-show="selectedMode.modeType === $mode.suddendeath"
          :lives="lives"
        ></Life>
        <transition
          name="test-card"
          enter-active-class="animated flipInX"
          leave-active-class="animated fadeOut"
          mode="out-in"
          appear
        >
          <TestCard
            v-if="isDisplayTestCard"
            :currentTest="currentTest"
            :test="tests[currentTest]"
            :testTotal="tests.length"
            ref="test_card"
            @option-click="addAnswer"
          ></TestCard>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ui/ModeTitle.vue';
import Time from '~/components/ui/Time.vue';
import TestCard from '~/components/tests/TestCard.vue';
import Life from '~/components/ui/Life.vue';
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      currentTest: 0,
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
      isDisplayTestCard: true,
    }
  },
  props: ["tests"],
  components: {
    ModeTitle,
    Time,
    TestCard,
    Life
  },
  methods: {
    // 選択肢押下時処理(解答時)
    addAnswer(value) {
      this.isDisplayTestCard = false;
      // 選択した解答を配列に保持（正誤かをtrue、falseで判断）
      this.newRecord.answerIncorrectsArray.push(value);

      if (this.currentTest === this.tests.length - 1) {
        // 最終問題の場合終了処理
        this.testEndProcessing();
      } else if (this.selectedMode.modeType === this.$mode.suddendeath) {
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

      // 自分のランクをセット
      this.setMyRank();

      // メッセージをセット
      this.setMessage();

      // VuexのnewRecordに登録処理
        // メッセージ取得処理
      // Vuexに解答結果と今回のテスト内容を送信し保持
      this.$store.dispatch('localStorages/setNewRecord', { newRecord: this.newRecord });
      this.$store.dispatch('localStorages/setBattleResult', ""); // 1on1の結果を初期化
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
        // 20位以内の場合のみかつゲストモードでない場合、ランキングを登録
      if (this.newRecord.myRank <= 20 && !this.$store.getters["localStorages/getGuestPlay"]) this.addRanking();
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
    judgmentLife(answer) {
      if (!answer.isAnswer) {
        // 不正解の場合、ライフを１削る
        this.lives.filter(l => l.life)[this.lives.filter(l => l.life).length - 1].icon = "mdi-heart-broken-outline"
        this.lives.filter(l => l.life)[this.lives.filter(l => l.life).length - 1].life = false
        this.remainingLife--;
      }
      
      // 残ライフが0の場合、検定終了(最終問題の場合はaddAnswerメソッドのif文で処理される)それ以外、次の問題に移行
      this.remainingLife === 0 ? this.testEndProcessing() : this.currentTest++
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
  watch: {
    isDisplayTestCard() {
      setTimeout(() => {
        this.isDisplayTestCard = true; // 1秒後にテストカード表示
      }, 1000)
    }
  }
}
</script>
