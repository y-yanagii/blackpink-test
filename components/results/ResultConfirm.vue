<template>
  <div class="text-center">
    <div class="check-the-answer-title">
      <h3>CHECK THE ANSWER</h3>
    </div>
    <div class="answers-list">
      <div
        v-for="(myCorrect, index) in res.myCorrects"
        :key="index"
        :class="getAnswerCheckClass(myCorrect.isAnswer)"
        @click.stop="changeModal(res.tests, index)"
        class="ansewerIncorrect-li"
      >
        <div><i class="mdi" :class="getAnswerCheckIcon(myCorrect.isAnswer)"/></div>
        <div class="ansewerIncorrect-number">{{ index + 1 }}</div>
        <div class="ansewerIncorrect-value">{{ myCorrect.answerContent }}</div>
        <div
          class="confirm-dialog-icon"
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
          <div
            v-if="res.modeType === $mode.music"
            class="modal-answer-music-embed"
          >
            <!-- 楽曲テストの場合リンクを表示 -->
            <a :href="embedCode">
              <img src="https://linkmaker.itunes.apple.com/assets/shared/badges/ja-jp/music-lrg.svg">
            </a>
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
      embedCode: "",
    }
  },
  props: ["res"],
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
      this.embedCode = testsObject[index].embedInfo.detail.subCode;
    }
  },
}
</script>

<style scoped lang="scss">
.check-the-answer-title {
  margin: 7% auto 3% auto;
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
    cursor: pointer;
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
    .ansewerIncorrect-value {
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .confirm-dialog-icon {
      margin: auto 0 auto auto;
      padding-right: 6%;
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

  .modal-answer-music-embed {
    margin-top: 4%;
    text-align: center;
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
