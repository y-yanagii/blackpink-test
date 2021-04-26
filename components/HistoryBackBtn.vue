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
  methods: {
    historyBack() {
      // ブラウザバック処理
      this.$router.back();
    }
  }
}
</script>
