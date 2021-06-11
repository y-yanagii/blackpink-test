<template>
  <div class="question-area">
    <!-- 問題文を1文字ずつ表示させるためv-forでかつspanタグ -->
    {{ q }}
    <span
      v-for="(q, index) in test.question"
      :key="index + Math.random()"
      v-text="q"
      class="question-item"
      :style="{animationDelay: index*100+'ms'}"
    />
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      q: "Q. ",
    }
  },
  props: ["test"]
}
</script>

<style scoped lang="scss">
// 問題文と解答文のアニメーション
@keyframes text-in {
  0% {
    transform: translate(-1px, 0px);
    opacity: 0;
  }
}
// 問題文と解答文のアニメーション
.question-item,.option-item {
  vertical-align: middle;
  padding-bottom: 2px;
  display: inline-block;
  min-width: 0.3em;
  animation-direction: normal;
  animation: text-in 0.8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
</style>
