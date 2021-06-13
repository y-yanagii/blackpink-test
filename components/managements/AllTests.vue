<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <div class="text-center">
          <div>
            <v-simple-table
              dense
              fixed-header
            >
              <thead>
                <tr>
                  <th style="border-right: solid 1px #f4a6b8; border-bottom: solid 1px #f4a6b8 !important;">No.</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">Q</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">A</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">B</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">C</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">D</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">SerialNum</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;">SerialNumToType</th>
                  <th class="text-center" style="border-bottom: solid 1px #f4a6b8 !important;"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(test, index) in tests"
                  :key="test.id"
                >
                  <td class="option-border-right">{{ index + 1 }}</td>
                  <td class="option-border-right-bottom">{{ test.question }}</td>
                  <td :class="answerClass(test.options[0].answer.isAnswer)" class="option-border-right-bottom">{{ test.options[0].optionContent }}</td>
                  <td :class="answerClass(test.options[1].answer.isAnswer)" class="option-border-right-bottom">{{ test.options[1].optionContent }}</td>
                  <td :class="answerClass(test.options[2].answer.isAnswer)" class="option-border-right-bottom">{{ test.options[2].optionContent }}</td>
                  <td :class="answerClass(test.options[3].answer.isAnswer)" class="option-border-right-bottom">{{ test.options[3].optionContent }}</td>
                  <td class="option-border-right-bottom">{{ test.serialNumber }}</td>
                  <td class="option-border-right-bottom">{{ test.serialNumberToType }}</td>
                  <td class="option-border-right-bottom"></td>
                </tr>

                <!-- 問題登録用 -->
                <tr v-if="modeType != $mode.music">
                  <td class="option-border-right"></td>
                  <td class="option-border-right-bottom"><input class="question-input" type="text" v-model="testInfo.question" /></td>
                  <td class="option-border-right-bottom"><input class="option-input option-a-input" type="text" v-model="testInfo.options[0].optionContent" /></td>
                  <td class="option-border-right-bottom"><input class="option-input option-b-input" type="text" v-model="testInfo.options[1].optionContent" /></td>
                  <td class="option-border-right-bottom"><input class="option-input option-c-input" type="text" v-model="testInfo.options[2].optionContent" /></td>
                  <td class="option-border-right-bottom"><input class="option-input option-d-input" type="text" v-model="testInfo.options[3].optionContent" /></td>
                  <td class="option-border-right-bottom">{{ getSerialNumber }}</td>
                  <td class="option-border-right-bottom">{{ getSerialNumberToType }}</td>
                  <td class="option-border-right-bottom"></td>
                </tr>
              </tbody>
            </v-simple-table>
            <div v-if="modeType != $mode.music" class="question-add-div">
              <v-btn
                class="question-add"
                outlined
                @click="add()"
              >
                問題登録
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js';

export default {
  data() {
    return {
      testInfo: {
        embedInfo: {
          detail: {
            subCode: "<p><a href=\"https://giphy.com/gifs/BLACKPINK-blackpink-the-show-o8ncre3fl0SuRwkLeq\">via GIPHY</a></p>",
            subContent: "via GIPHY"
          },
          embedCode: "https://giphy.com/embed/o8ncre3fl0SuRwkLeq",
          embedType: 0
        },
        modeType: 0,
        question: "",
        questionType: 0,
        serialNumber: 0,
        serialNumberToType: 0,
        options: [
          { answer: { isAnswer: true, isNumber: 1 }, optionContent: "" },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: "" },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: "" },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: "" },
        ]
      }
    }
  },
  props: ["tests", "modeType", "maxSerialNumber", "maxSerialNumberToType"],
  methods: {
    answerClass(isAnswer) {
      if (isAnswer) {
        return "is-answer"
      }
    },
    add() {
      // test登録処理
      this.testInfo.modeType = this.modeType;

      db.collection("tests").add({
        embedInfo: {
          detail: {
            subCode: this.testInfo.embedInfo.detail.subCode,
            subContent: this.testInfo.embedInfo.detail.subContent,
          },
          embedCode: this.testInfo.embedInfo.embedCode,
          embedType: this.testInfo.embedInfo.embedType,
        },
        modeType: this.testInfo.modeType,
        question: this.testInfo.question,
        questionType: this.testInfo.questionType,
        serialNumber: this.testInfo.serialNumber,
        serialNumberToType: this.testInfo.serialNumberToType,
        options: [
          { answer: { isAnswer: true, isNumber: 1 }, optionContent: this.testInfo.options[0].optionContent },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: this.testInfo.options[1].optionContent },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: this.testInfo.options[2].optionContent },
          { answer: { isAnswer: false, isNumber: 0 }, optionContent: this.testInfo.options[3].optionContent },
        ]
      }).then((res) => {
        this.testInfo.question = '';
        this.testInfo.options[0].optionContent = '';
        this.testInfo.options[1].optionContent = '';
        this.testInfo.options[2].optionContent = '';
        this.testInfo.options[3].optionContent = '';
      });
    },
  },
  computed: {
    songCount() {

    },
    getSerialNumber() {
      if (this.maxSerialNumber.length > 0) {
        this.testInfo.serialNumber = this.maxSerialNumber[0].serialNumber + 1;
      }

      return this.testInfo.serialNumber;
    },
    getSerialNumberToType() {
      if (this.maxSerialNumberToType.length > 0) {
        this.testInfo.serialNumberToType = this.maxSerialNumberToType[0].serialNumberToType + 1;
      }

      return this.testInfo.serialNumberToType;
    }
  }
}
</script>

<style scoped lang="scss">
// テーブル領域
.option-border-right-bottom {
  border-right: solid 1px $base-text-color;
  border-bottom: solid 1px $base-text-color !important;
}
.option-border-bottom {
  border-bottom: solid 1px $base-text-color !important;
}
.option-border-right {
  border-right: solid 1px $base-text-color;
}
.is-answer {
  background-color: $base-bg-pink;
  color: $text-color-black;
}
.is-not-answer {
  background-color: $base-bg-color;
}

.question-input {
  width: 100%;
  color: white;
}

.question-add-div {
  width: 100%;
  .question-add {
    margin-top: 12px;
  }
}
.option-input {
  width: 100%;
  color: white;
}
</style>