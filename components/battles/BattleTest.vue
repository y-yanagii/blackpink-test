<template>
  <div class="text-center">
    <div class="users-area">
      <div>
        <v-avatar
          size="40"
          color="#f4a6b8"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </div>
      <div>
        <v-avatar
          size="40"
          color="#f4a6b8"
        >
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
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
        class="test-card"
      >
        <Question
          :test="test"
        ></Question>
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

export default {
  data: function() {
    return {
      isDisplayNum: 2,
      transitionName: "question-no",
      abcd: ["A. ", "B. ", "C. ", "D. "],
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
    speedSendAnswer() {
      // 解答送信
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
.test-card {
  margin: auto;
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
</style>
