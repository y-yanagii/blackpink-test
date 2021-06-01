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
          :test="tests[questionNo]"
        ></Question>
        <div class="content-battle-area">

        </div>
        <Options
          :test="tests[questionNo]"
          :abcd="abcd"
          :isProcessing="isProcessing"
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
  data() {
    return {
      isDisplayNum: 2,
      transitionName: "question-no",
      abcd: ["A. ", "B. ", "C. ", "D. "],
      opponentStatus: 0, // 相手の正答状況
      unsubscribe: null, // 5問終了した時点で監視終了
      myCorrect: 0, // 1:不正解、2:正解
      othermyCorrect: 0, // 1:不正解、2:正解
      numOfAnswers: 0, // 現在の回答数
      questionNo: 0, // クエッションナンバー
      isProcessing: false, // 選択値ボタンの制御
    }
  },
  props: ["tests"],
  methods: {
    displayControl() {
      // No.と問題表示の切り替え
      if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // 問題表示
        this.isDisplayNum = this.$battleDisplayNum.test;
        this.transitionName = "test";
      } else if (this.isDisplayNum === this.$battleDisplayNum.test) {
        // Question No.〇〇を表示
        this.isDisplayNum = this.$battleDisplayNum.questionNo;
        this.transitionName = "question";
      }
    },
    speedSendAnswer(abcdStr, optionBtnInfo) {
      // 解答送信
      const twitterId = this.$store.getters["localStorages/getTwitterId"];
      const isAnswerVal = optionBtnInfo.answer.isAnswer ? this.$answerJudgment.correct : this.$answerJudgment.incorrect;
      if (this.numOfAnswers === 0) {
        // 他に回答者がいない場合
        this.setFirstUserAnswer(twitterId, isAnswerVal);
      } else {
        // 他に回答者がいた場合
        this.setSecondUserAnswer(twitterId, isAnswerVal);
      }
    },
    setCorrectMark(correction) {
      // 正解者に丸を付与
      correction = this.$answerJudgment.correctMark;
      correctEffects.volume = 0.7;
      correctEffects.play();
      correctEffects.currentTime = 0;
    },
    setIncorrectMark(correction) {
      // 不正解者にバツを付与
      correction = this.$answerJudgment.incorrectMark;
      incorrectEffects.volume = 0.7;
      incorrectEffects.play();
      incorrectEffects.currentTime = 0;
    },
    setFirstUserAnswer(twitterId, isAnswerVal) {
      // ファースト回答者として登録
      if (this.questionNo === 0) {
        // 1問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result1.firstId': twitterId,
          'battleResult.result1.firstResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 1) {
        // 2問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result2.firstId': twitterId,
          'battleResult.result2.firstResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 2) {
        // 3問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result3.firstId': twitterId,
          'battleResult.result3.firstResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 3) {
        // 4問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result4.firstId': twitterId,
          'battleResult.result4.firstResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 4) {
        // 5問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result5.firstId': twitterId,
          'battleResult.result5.firstResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      }
    },
    setSecondUserAnswer(twitterId, isAnswerVal) {
      // セカンド回答者として登録
      if (this.questionNo === 0) {
        // 1問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result1.secondId': twitterId,
          'battleResult.result1.secondResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 1) {
        // 2問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result2.secondId': twitterId,
          'battleResult.result2.secondResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 2) {
        // 3問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result3.secondId': twitterId,
          'battleResult.result3.secondResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 3) {
        // 4問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result4.secondId': twitterId,
          'battleResult.result4.secondResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      } else if (this.questionNo === 4) {
        // 5問目
        db.collection('rooms').doc(this.$route.params.id).update({
          'battleResult.result5.secondId': twitterId,
          'battleResult.result5.secondResult': isAnswerVal,
        }).catch(error => {
          // 楽観ロックのエラーの場合かつ相手が不正解の場合、secondとして登録
        });
      }
    },
  },
  mounted() {
    // スナップショットでrooms監視
    this.unsubscribe = db.collection('rooms').doc(this.$route.params.id).onSnapshot(snapshot => {
      let battleRes = {};
      switch (this.questionNo) {
        case 0:
          battleRes = snapshot.data().battleResult.result1; // 1問目の解答
          break;
        case 1:
          battleRes = snapshot.data().battleResult.result2; // 2問目の解答
          break;
        case 2:
          battleRes = snapshot.data().battleResult.result3; // 3問目の解答
          break;
        case 3:
          battleRes = snapshot.data().battleResult.result4; // 4問目の解答
          break;
      }

      if (battleRes.firstId) {
        // 最初の回答者の正誤判定
        if (battleRes.firstResult === this.$answerJudgment.correct) {
          // 正解者に丸を付与
          if (battleRes.firstId === this.$store.getters["localStorages/getTwitterId"]) {
            this.myCorrect = this.$answerJudgment.correctMark;
          } else {
            this.othermyCorrect = this.$answerJudgment.correctMark;
          }
          
          // 効果音再生
          correctEffects.volume = 0.7;
          correctEffects.play();
          correctEffects.currentTime = 0;

          // 次の問題へ
          this.numOfAnswers = 0;
          this.isProcessing = false;
          this.questionNo++;
          this.displayControl();
        } else {
          // 不正解の場合
          // 不正解者にバツを付与
          if (battleRes.firstId === this.$store.getters["localStorages/getTwitterId"]) {
            this.myCorrect = this.$answerJudgment.incorrectMark;
            // 不正解者が自分の場合、相手の回答を待つためボタンを日活性
            this.isProcessing = true;
          } else {
            this.othermyCorrect = this.$answerJudgment.incorrectMark;
          }

          // 効果音再生
          incorrectEffects.volume = 0.7;
          incorrectEffects.play();
          incorrectEffects.currentTime = 0;

          // 相手の解答を待つ
          this.numOfAnswers++;
        }
      } else if (battleRes.secondId) {
        // 最後の回答者の正誤判定
        if (battleRes.secondResult === this.$answerJudgment.correct) {
          // 正解者に丸を付与
          if (battleRes.secondId === this.$store.getters["localStorages/getTwitterId"]) {
            this.myCorrect = this.$answerJudgment.correctMark;
          } else {
            this.othermyCorrect = this.$answerJudgment.correctMark;
          }
          
          // 効果音再生
          correctEffects.volume = 0.7;
          correctEffects.play();
          correctEffects.currentTime = 0;

          // 次の問題へ
          this.numOfAnswers = 0;
          this.isProcessing = false;
          this.questionNo++;
          this.displayControl();
        } else {
          // 不正解の場合
          // 不正解者にバツを付与
          if (battleRes.secondId === this.$store.getters["localStorages/getTwitterId"]) {
            this.myCorrect = this.$answerJudgment.incorrectMark;
          } else {
            this.othermyCorrect = this.$answerJudgment.incorrectMark;
          }

          // 効果音再生
          incorrectEffects.volume = 0.7;
          incorrectEffects.play();
          incorrectEffects.currentTime = 0;

          // 次の問題へ
          this.numOfAnswers = 0;
          this.isProcessing = false;
          this.questionNo++;
          this.displayControl();
        }
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
