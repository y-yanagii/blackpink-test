<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo">
              MODE
            </span>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            outlined
            class="common-mode-button mode-button"
            @click="selectMode($event.target.textContent)"
          >E A S Y</v-btn>

          <v-btn
            outlined
            class="common-mode-button mode-button"
          >N O R M A L</v-btn>

          <v-btn
            outlined
            class="common-mode-button mode-button"
          >H A R D</v-btn>

          <v-btn
            outlined
            class="common-mode-button master-mode-button"
          >M A S T E R</v-btn>

          <v-btn
            outlined
            class="common-mode-button suddendeath-mode-button"
          >SUDDEN DEATH</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {
    // 難易度選択を保持
    selectMode(choiceMode) {
      // dispatchでVuexのactionsを呼ぶ
      // replaceで文字列中の空白除去
      this.$store.dispatch('mode/selectMode', choiceMode.replace(/\s+/g, ""));
      this.$router.push({ path: "/mode/start" });
      console.log(this.$store.getters['mode/choiceMode']);
    }
  }
}
</script>
