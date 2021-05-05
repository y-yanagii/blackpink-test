<template>
  <Mode
    v-if="showNumber === $modeNumber.mode"
    @change-show-number="changeShowNumber"
  ></Mode>
  <ModeSelect
    v-else-if="showNumber === $modeNumber.test || showNumber === $modeNumber.game"
    @change-show-number="changeShowNumber"
    :showNumber="showNumber"
    :playModeText="playModeText"
  ></ModeSelect>
</template>

<script>
import Mode from '~/components/pages/modes/Mode.vue';
import ModeSelect from '~/components/pages/modes/ModeSelect.vue';
import GameMode from '~/components/pages/modes/GameMode.vue';

export default {
  data() {
    return {
      showNumber: 0,
      playModeText: "",
    }
  },
  methods: {
    // 選択したモードに対応して画面を切り替える
    changeShowNumber(newNumber) {
      if (newNumber === this.$modeNumber.test) {
        this.playModeText = this.$playModeText.test
      } else if (newNumber === this.$modeNumber.game) {
        this.playModeText = this.$playModeText.game
      } else {
        this.playModeText = "";
      }

      this.showNumber = newNumber
    }
  },
  components: {
    Mode,
    ModeSelect,
    GameMode
  }
}
</script>
