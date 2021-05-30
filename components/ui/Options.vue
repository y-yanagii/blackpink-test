<template>
  <div class="options-area">
    <!-- 選択肢領域 -->
    <div
      v-for="(optionBtnInfo, index) in test.options"
      :key="index"
    >
      <v-btn
        outlined
        class="option-btn"
        nuxt
        @click="$emit('option-click', abcd[index], optionBtnInfo)"
      >
        {{abcd[index]}}
        <span
          v-for="(t, index) in optionBtnInfo.optionContent"
          :key="index + Math.random()"
          v-text="t"
          class="option-item"
          :style="{animationDelay: index*100+'ms'}"
          ref="test_card"
        />
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  props: ["test", "abcd"],
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
.option-item {
  display: inline-block;
  min-width: 0.3em;
  animation-direction: normal;
  animation: text-in 0.8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
</style>