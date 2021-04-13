<template>
  <div class="text-center">
    <div class="test-card text-center">
      <div class="text-left test-number-area">
        {{ currentTest + " / " + testSum }}
      </div>
      <div class="question-area">
        <p>{{ q }} YSLのアンバサダーを勤めたことのあるメンバーは誰でしょう？</p>
      </div>
      <div class="content-area">

      </div>
      <div class="options-area">
        <!-- 選択肢領域 -->
        <div
          v-for="optionBtn in optionsBtn"
          :key="optionBtn.textContent"
          :class="optionBtn.class"
        >
          <v-btn
            outlined
            class="option-btn"
            nuxt
          >{{ optionBtn.textContent }}</v-btn>
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentTest: 0,
      testSum: 15,
      q: "Q. ",
      a: "A. ",
      b: "B. ",
      c: "C. ",
      d: "D. ",
    }
  },
  computed: {
    // 選択値をオブジェクトの配列で定義
    optionsBtn() {
      return [
        { class: "option-a", textContent: this.$data.a + "Jisoo" },
        { class: "option-b", textContent: this.$data.b + "Rosé" },
        { class: "option-c", textContent: this.$data.c + "Lisa" },
        { class: "option-d", textContent: this.$data.d + "Jennie" },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .test-card {
    margin: auto;
    width: 90%;
    height: 510px;
    border: solid 2px $base-text-color;
    background-color: $card-background-color;
    border-radius: 9px;
  }

  .test-number-area {
    color: $base-text-color;
    padding: 2%;
  }
</style>
