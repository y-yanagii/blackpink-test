<template>
  <div class="history">
    <v-btn
      elevation="2"
      class="history-btn"
      outlined
      @click="historyBack()"
    >
    <v-icon>mdi-undo-variant</v-icon>BACK</v-btn>
  </div>
</template>

<script>
export default {
  props: ["showNumber"],
  methods: {
    historyBack() {
      // 戻る処理
      if (typeof this.showNumber === "undefined") {
        // バック処理
        this.$emit('back-click');
      } else {
        this.$emit('change-show-number', this.showNumber)
      }
    }
  }
}
</script>
