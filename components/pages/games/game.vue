<template>
  <Bubble v-if="selectedMode.modeType === $mode.bubble"></Bubble>
</template>

<script>
import Bubble from '~/components/pages/games/Bubble.vue'

export default {
  data: function() {
    return {
      selectedMode: this.$store.getters['localStorages/choiceMode'],
    }
  },
  components: {
    Bubble,
  }
}
</script>
