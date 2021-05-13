<template>
  <Mode
    v-if="showNumber === $modeNumber.mode"
    @change-show-number="changeShowNumber"
  ></Mode>
  <ModeSelect
    v-else-if="showNumber === $modeNumber.test || showNumber === $modeNumber.game || showNumber === $modeNumber.challenge"
    @change-show-number="changeShowNumber"
    :showNumber="showNumber"
    :playModeText="playModeText"
  ></ModeSelect>
</template>

<script>
import Mode from '~/components/pages/modes/Mode.vue';
import ModeSelect from '~/components/pages/modes/ModeSelect.vue';

export default {
  data: function() {
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
      } else if (newNumber === this.$modeNumber.challenge) {
        this.playModeText = this.$playModeText.challenge
      } else {
        this.playModeText = "";
      }

      // ローカルストレージにplayTypeを保持
      this.$store.dispatch('localStorages/setPlayType', newNumber);

      this.showNumber = newNumber
    },
  },
  components: {
    Mode,
    ModeSelect,
  }
}
</script>
