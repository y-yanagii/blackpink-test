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
        :class="getAnswerCheckClass(ansewerIncorrect.isAnswer)"
      >
        <div><i class="mdi" :class="getAnswerCheckIcon(ansewerIncorrect.isAnswer)"/></div>
        <div class="ansewerIncorrect-number">{{ index + 1 }}</div>
        <div class="ansewerIncorrect-value">{{ ansewerIncorrect.answerContent }}</div>
        <div
          class="confirm-dialog-icon"
          @click.stop="changeModal(tests, index)"
        ><i class="mdi mdi-comment-search" /></div>
      </div>
    </div>
    <!-- 解答確認ダイアログ領域 -->
    <v-dialog
      v-model="dialog"
      max-width="550px"
    >
      <v-card>
        <div class="modal-card">
          <div class="modal-answer-is">
            The answer is...
          </div>
          <div class="modal-question">
            {{ "Q. " + modalQuestion }}
          </div>
          <div class="modal-answer-content">
            {{ "A. " + modalAnswerContent }}
          </div>
          <v-card-actions class="modal-footer">
            <v-spacer></v-spacer>
            <v-btn
              @click="dialog = false"
              class="modal-footer-btn"
            >CLOSE</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
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
      dialog: false,
      modalQuestion: "",
      modalAnswerContent: "",
    }
  },
  props: ["newRecord", "tests"],
  methods: {
    getAnswerCheckClass(value) {
      // 正解した問いはベースカラーで塗りつぶす
      return value ? this.answerClass : this.incorrectClass
    },
    getAnswerCheckIcon(value) {
      // 正解した問いはチェックマーク付与
      return value ? this.answerIcon : this.incorrectIcon
    },
    getAnswerContent(testObject) {
      // 正解のテキストを返す
      return testObject.options.filter(f => f.answer.isAnswer)[0].optionContent
    },
    changeModal(testsObject, index) {
      // 正答確認ダイアログを表示し、問題文、正解のテキストを返す
      this.dialog = true;
      this.modalQuestion = testsObject[index].question;
      this.modalAnswerContent = testsObject[index].options.filter(f => f.answer.isAnswer)[0].optionContent;
    }
  },
}
</script>

<style scoped lang="scss">
.check-the-answer-title {
  margin: 17% auto 3% auto;
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
    height: 40px;
    div {
      margin: auto 0;
      padding-left: 3%;
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
    .confirm-dialog-icon {
      margin: auto 0 auto auto;
      padding-right: 3%;
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

// 解答モーダル
.modal-card {
  border: solid 2px $base-text-color;
  border-radius: 7px !important;

  .modal-question {
    background-color: $base-bg-color;
    font-size: 15px;
    margin: 5%;
    padding: 2%;
    color: $base-text-color;
    border: solid 2px $base-text-color;
    border-radius: 7px;
  }

  .modal-answer-is {
    font-size: 18px;
    margin: 3% 5% 1% 5%;
    color: $base-text-color !important;
  }

  .modal-answer-content {
    background-color: $base-bg-pink;
    font-size: 15px;
    margin: 0% 5%;
    padding: 2%;
    color: $text-color-black !important;
    border-radius: 7px;
  }

  .modal-footer-btn {
    margin: 3%;
    background-color: $base-bg-color !important;
    color: $base-text-color;
    border: solid 2px $base-text-color;
    border-radius: 7px;
  }
}
</style>
