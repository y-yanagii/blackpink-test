<template>
  <div class="text-center">
    <transition
      :name="transitionName"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
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
      </div>
    </transition>
  </div>
</template>

<script>
import QuestionNo from '~/components/battles/QuestionNo.vue';
import Question from '~/components/ui/Question.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 2,
      transitionName: "question-no",
    }
  },
  props: ["test", "questionNo"],
  methods: {
    displayControl() {
      if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // 問題表示
        this.isDisplayNum = this.$battleDisplayNum.test;
        this.transitionName = "test";
      } else if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // Question No.〇〇を表示
        this.isDisplayNum = this.$battleDisplayNum.questionNo;
        this.transitionName = "question";
      }
    }
  },
  components: {
    QuestionNo,
    Question,
  }
}
</script>

<style scoped lang="scss">
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
