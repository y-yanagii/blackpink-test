<template>
  <div class="text-center">
    <div class="users-area">
      <div class="avatar-circle">
        <v-avatar
          size="40"
          color="#f4a6b8"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <div v-if="myCorrect == $answerJudgment.correctMark" class="mark correct-mark"></div>
        <div v-else-if="myCorrect === $answerJudgment.incorrectMark" class="mark incorrect-mark">❌</div>
      </div>
      <div class="avatar-circle">
        <v-avatar
          size="40"
          color="#f4a6b8"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <div v-if="othermyCorrect === $answerJudgment.correctMark" class="mark correct-mark"></div>
        <div v-else-if="othermyCorrect === $answerJudgment.incorrectMark" class="mark incorrect-mark">❌</div>
      </div>
    </div>
    <transition
      :name="transitionName"
      enter-active-class="animated flipInX"
      leave-active-class="animated fadeOut"
      mode="out-in"
      appear
    >
      <QuestionNo
        v-if="isDisplayNum === $battleDisplayNum.questionNo"
        @display-control="displayControl"
        :questionNo="questionNo"
      ></QuestionNo>
      <div
        v-else-if="isDisplayNum === $battleDisplayNum.test"
        class="battle-card"
      >
        <Question
          :test="test"
        ></Question>
        <div class="content-battle-area">

        </div>
        <Options
          :test="test"
          :abcd="abcd"
          @option-click="speedSendAnswer"
        ></Options>
      </div>
    </transition>
  </div>
</template>

<script>
import QuestionNo from '~/components/battles/QuestionNo.vue';
import Question from '~/components/ui/Question.vue';
import Options from '~/components/ui/Options.vue';
import { db } from '~/plugins/firebase.js';
import correctMp3 from '~/assets/images/battle/correct.mp3';
import incorrectMp3 from '~/assets/images/battle/incorrect.mp3';
const correctEffects = new Audio(correctMp3);
const incorrectEffects = new Audio(incorrectMp3);

export default {
  data: function() {
    return {
      isDisplayNum: 2,
      transitionName: "question-no",
      abcd: ["A. ", "B. ", "C. ", "D. "],
      opponentStatus: 0, // 相手の正答状況
      unsubscribe: null, // 5問終了した時点で監視終了
      myCorrect: 0, // 1:不正解、2:正解
      othermyCorrect: 0, // 1:不正解、2:正解
    }
  },
  props: ["test", "questionNo"],
  methods: {
    displayControl() {
      // No.と問題表示の切り替え
      if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // 問題表示
        this.isDisplayNum = this.$battleDisplayNum.test;
        this.transitionName = "test";
      } else if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // Question No.〇〇を表示
        this.isDisplayNum = this.$battleDisplayNum.questionNo;
        this.transitionName = "question";
      }
    },
    speedSendAnswer(abcdStr, optionBtnInfo) {
      // 解答送信
      this.myCorrect = 2
      correctEffects.volume = 0.7;
      correctEffects.play();
      if (optionBtnInfo.answer.isAnswer) {
        // 正解の場合
      } else {
        // 不正解の場合
      }
    },
    setCorrectMark() {
      // 正解者に丸を付与
    },
    setIncorrectMark() {
      // 不正解者にバツを付与
    }
  },
  mounted() {
    // スナップショットでrooms監視
    this.unsubscribe = db.collection('rooms').doc(this.$route.params.id).onSnapshot(snapshot => {
      if (snapshot.data().battleResults[this.questionNo].secondUser === this.$store.getters["localStorages/getTwitterId"]) {
        // 最後の回答者が自分自身の場合
        // 正誤判定
        if (snapshot.data().battleResults[this.questionNo].secondUserAnswer === this.$answerJudgment.correct) {
          // 正解の場合、丸を付与
        }
      } else {
        // 最後の回答者が相手の場合
      }
      
      if (snapshot.data().battleResults[this.questionNo].firstUser === this.$store.getters["localStorages/getTwitterId"]) {
        // 最初の回答者が自分自身の場合
        // 正誤判定
        if (snapshot.data().battleResults[this.questionNo].firstUserAnswer === this.$answerJudgment.correct) {
          // 正解の場合丸を付与
        }
      } else {
        // 最初の回答者が相手の場合
      }
    });
  },
  watch: {
    myCorrect() {
      setTimeout(() => {
        this.myCorrect = 0; // 初期化
      }, 1000)
    },
    othermyCorrect() {
      setTimeout(() => {
        this.othermyCorrect = 0; // 初期化
      }, 1000)
    },
  },
  components: {
    QuestionNo,
    Question,
    Options,
  }
}
</script>

<style scoped lang="scss">
// ユーザエリア
.users-area {
  padding: 0 30px;
  margin: 3px 0 13px 0;
  width: 100%;
  display: flex;
  div:nth-of-type(1) {
    margin: auto auto auto 0;
  }
}

// テスト領域
.battle-card {
  margin: auto;
  padding: 5% 0;
  width: 100%;
  border: solid 2px $base-text-color;
  background-color: $card-background-color;
  border-radius: 9px;
}

// テスト画面アニメーション
.test-enter-active, .test-leave-active{
    transition: opacity 1s
}
.test-enter, .test-leave-to{
    opacity: 0;
}

.content-battle-area {
  margin-bottom: 50%;
}

.avatar-circle {
  position: relative;
}

// ◯×
.mark {
  position: absolute;
  top: 24px;
  left: 22px;
  width: 60%;
  height: 60%;
}
// ◯
.correct-mark {
  border: solid 4px green;
  border-radius: 50%;
}

// ×
.incorrect-mark {

}
</style>
