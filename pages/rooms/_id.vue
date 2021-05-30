<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <div v-cloak>
          <transition
            :name="transitionName"
            mode="out-in"
            appear
          >
            <Vs
              v-if="isDisplayNum === $battleDisplayNum.battle"
              @display-control="displayControl"
              :isDisplayNum="isDisplayNum"
              :userNames="userNames"
            ></Vs>
            <Start
              v-else-if="isDisplayNum === $battleDisplayNum.start"
              @display-control="displayControl"
            ></Start>
            <QuestionNo
              v-else-if="isDisplayNum === $battleDisplayNum.questionNo"
              @display-control="displayControl"
              :questionNo="questionNo"
            ></QuestionNo>
          </transition>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vs from '~/components/battles/Vs.vue';
import Start from '~/components/battles/Start.vue';
import QuestionNo from '~/components/battles/QuestionNo.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
      userNames: ["柳澤_RUNTEQ17期生", "山田 太郎"],
      questionNo: 1,
      transitionName: "vs",
    }
  },
  methods: {
    displayControl() {
      if (this.isDisplayNum === this.$battleDisplayNum.battle) {
        // VS画面を非表示とし、START画面に切り替え
        this.isDisplayNum = this.$battleDisplayNum.start;
        this.transitionName = "start";
      } else if (this.isDisplayNum === this.$battleDisplayNum.start) {
        // START画面を非表示とし、Question No.〇〇を表示
          this.isDisplayNum = this.$battleDisplayNum.questionNo;
        setTimeout(() => {
          this.transitionName = "question";
        }, 1000)
      } else if (this.isDisplayNum === this.$battleDisplayNum.questionNo) {
        // Question No.画面を非表示とし、問題表示
        this.isDisplayNum = this.$battleDisplayNum.test;
      }
    }
  },
  validate(context) {
    if (context.params.id) return true;

    return false;
  },
  components: {
    Vs,
    Start,
    QuestionNo,
  }
}
</script>

<style scoped lang="scss">
// vs画面アニメーション
.vs-enter-active, .vs-leave-active{
    transition: opacity 2s
}
.vs-enter, .vs-leave-to{
    opacity: 0;
}

// START!画面アニメーション
.start-enter-active, .start-leave-active{
    transition: opacity 2s
}
.start-enter, .start-leave-to{
    opacity: 0;
}

// Questionナンバー画面アニメーション
.question-enter-active, .question-leave-active{
    -webkit-transform: scale(0.5);
    transform: scale(1);
    -webkit-transition: .3s ease-in;
    transition: .3s ease-in;
}
.question-enter, .question-leave-to{
    opacity: 0;
}
</style>