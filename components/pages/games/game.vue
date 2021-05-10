<template>
  <Bubble v-if="selectedMode.modeType === $mode.bubble"></Bubble>
  <Puzzle v-else-if="selectedMode.modeType === $mode.puzzle"></Puzzle>
</template>

<script>
import Bubble from '~/components/pages/games/Bubble.vue'
import Puzzle from '~/components/pages/games/Puzzle.vue'

export default {
  data: function() {
    return {
      selectedMode: this.$store.getters['localStorages/choiceMode'],
    }
  },
  components: {
    Bubble,
    Puzzle,
  }
}
</script>
