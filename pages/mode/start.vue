<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo">
              {{ showSelectedMode() + " MODE"}}
            </span>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            outlined
            class="common-mode-button mode-button"
          >TEST START!</v-btn>
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
    showSelectedMode() {
      return this.$store.getters['mode/choiceMode']
    }
  }
}
</script>
