<!-- モード選択領域 -->
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
          <!-- computedに定義した配列オブジェクトをv-forで回しバインディングを設定 -->
          <transition-group name="fade" appear>
          <v-btn
            v-for="mode in modeButtons"
            :key="mode.showNumber"
            class="common-mode-button mode-button"
            @click="selectMode(mode.showNumber)"
            outlined
          >
          {{ mode.modeText }}
          </v-btn>
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    selectMode(showNumber) {
      // 選択したモード画面に遷移
      this.$emit('change-show-number', showNumber)
    },
  },
  computed: {
    modeButtons() {
      return [
        { showNumber: this.$modeNumber.test, modeText: "T E S T" },
        { showNumber: this.$modeNumber.challenge, modeText: "C H A L L E N G E" },
        { showNumber: this.$modeNumber.battle, modeText: "B A T T L E" },
        { showNumber: this.$modeNumber.game, modeText: "G A M E" },
      ]
    }
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
