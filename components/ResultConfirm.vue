<template>
  <div class="text-center">
    <div class="check-the-answer-title">
      <h3>CHECK THE ANSWER</h3>
    </div>
    <div class="answers-list">
      <div
        v-for="(ansewerIncorrect, index) in newRecord.answerIncorrectsArray"
        :key="index"
        class="ansewerIncorrect-li"
        :class="getAnswerCheckClass(ansewerIncorrect)"
      >
        <div><i class="mdi" :class="getAnswerCheckIcon(ansewerIncorrect)"/></div>
        <div class="ansewerIncorrect-number">{{ index + 1 + ". " }}</div>
        <div class="ansewerIncorrect-value">{{ ansewerIncorrect }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answerClass: "ansewerIncorrect-li-true",
      incorrectClass: "ansewerIncorrect-li-false",
      answerIcon: "mdi-check-circle",
      incorrectIcon: "mdi-file-excel-box",
    }
  },
  props: ["newRecord"],
  methods: {
    getAnswerCheckClass(value) {
      return value ? this.answerClass : this.incorrectClass
    },
    getAnswerCheckIcon(value) {
      return value ? this.answerIcon : this.incorrectIcon
    }
  }
}
</script>

<style scoped lang="scss">
.check-the-answer-title {
  margin: 6% auto 3% auto;
  h3 {
    color: $base-text-color;
  }
}

.answers-list {
  margin: auto;
  width: 90%;
  .ansewerIncorrect-li {
    display: flex;
    margin: 1% auto;
    border: solid 2px $base-text-color;
    border-radius: 6px;
    width: 100%;
    div {
      padding-left: 10px;
      i {
        font-size: 17px;
      }
      .mdi-check-circle {
        color: green;
      }
      .mdi-file-excel-box {
        color: red;
      }
    }
    .ansewerIncorrect-number {
      
    }
    .ansewerIncorrect-value {
      
    }
  }
  .ansewerIncorrect-li-true {
    background-color: $base-bg-pink;
    color: $text-color-black;
  }
  .ansewerIncorrect-li-false {
    color: $base-text-color;
  }
}
</style>
