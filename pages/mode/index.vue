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
            to="/start"
          >E A S Y</v-btn>

          <v-btn
            outlined
            class="common-mode-button mode-button"
            to="/start"
          >N O R M A L</v-btn>

          <v-btn
            outlined
            class="common-mode-button mode-button"
            to="/start"
          >H A R D</v-btn>

          <v-btn
            outlined
            class="common-mode-button master-mode-button"
            to="/start"
          >M A S T E R</v-btn>

          <v-btn
            outlined
            class="common-mode-button suddendeath-mode-button"
            to="/start"
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
    
  }
}
</script>
