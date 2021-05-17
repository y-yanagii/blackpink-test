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
                  <td class="option-border-right-bottom"></td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["tests", "modeType"],
  methods: {
    answerClass(isAnswer) {
      if (isAnswer) {
        return "is-answer"
      }
    }
  },
  computed: {
    songCount() {

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
</style>