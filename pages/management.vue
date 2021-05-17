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
                  <th>No.</th>
                  <th class="text-center">A</th>
                  <th class="text-center">B</th>
                  <th class="text-center">C</th>
                  <th class="text-center">D</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(test, index) in tests"
                  :key="test.id"
                >
                  <td>{{ index }}</td>
                  <td :class="answerClass(test.options[0].answer.isAnswer)" class="option-content">{{ test.options[0].optionContent }}</td>
                  <td :class="answerClass(test.options[1].answer.isAnswer)" class="option-content">{{ test.options[1].optionContent }}</td>
                  <td :class="answerClass(test.options[2].answer.isAnswer)" class="option-content">{{ test.options[2].optionContent }}</td>
                  <td :class="answerClass(test.options[3].answer.isAnswer)" class="option-content">{{ test.options[3].optionContent }}</td>
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
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      tests: [],
    }
  },
  firestore: {
    tests: db.collection("tests").where('modeType', '==', 5)
  },
  methods: {
    answerClass(isAnswer) {
      if (isAnswer) {
        return "is-answer"
      }
    }
  },
  mounted() {
    this.$store.dispatch('tests/init');
  }
}
</script>

<style scoped lang="scss">
.option-content {
  border: solid 1px $base-text-color;
}
.is-answer {
  background-color: $base-bg-pink;
  color: $text-color-black;
}
.is-not-answer {
  background-color: $base-bg-color;
}
</style>