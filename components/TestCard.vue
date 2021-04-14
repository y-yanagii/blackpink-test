<template>
  <div class="text-center">
    <div class="test-card text-center">
      <div class="text-left test-number-area">
        {{ currentTest + " / " + testSum }}
      </div>
      <div class="question-area">
        <!-- 問題文を1文字ずつ表示させるためv-forでかつspanタグ -->
        <span
          v-for="(q, index) in question"
          :key="index"
          v-text="q"
          class="question-item"
          :style="{animationDelay: index*100+'ms'}"
        />
      </div>
      <div class="content-area">
        <!-- コンテンツ領域 -->
        <ul>
          <li v-for="(test, index) in tests" :key="index">{{test}}</li>
        </ul>
      </div>
      <div class="options-area">
        <!-- 選択肢領域 -->
        <div
          v-for="optionBtn in optionsBtn"
          :key="optionBtn.textContent"
          :class="optionBtn.class"
        >
          <v-btn outlined class="option-btn" nuxt>
            <span
              v-for="(t, index) in optionBtn.textContent"
              :key="index"
              v-text="t"
              class="option-item"
              :style="{animationDelay: index*100+'ms'}"
              />
          </v-btn>
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
      question: "Q. YSLのアンバサダーを勤めたことのあるメンバーは誰でしょう？",
      a: "A. ",
      b: "B. ",
      c: "C. ",
      d: "D. ",
    }
  },
  props: ["tests"],
  methods: {
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

  @keyframes text-in {
    0% {
      transform: translate(-1px, 0px);
      opacity: 0;
    }
  }

  .question-item,.option-item {
    display: inline-block;
    min-width: 0.3em;
    animation-direction: normal;
    animation: text-in 0.8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }
</style>
