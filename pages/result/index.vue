<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition name="fadeResultCard" appear>
          <ResultCard
            :newRecord="newRecord"
          ></ResultCard>
        </transition>
        <ResultSns></ResultSns>
        <ResultFooter></ResultFooter>
        <ResultConfirm
          :newRecord="newRecord"
          :tests="tests"
        ></ResultConfirm>
        <YoutubeArea></YoutubeArea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResultCard from '~/components/ResultCard.vue';
import ResultFooter from '~/components/ResultFooter.vue';
import ResultSns from '~/components/ResultSns.vue';
import ResultConfirm from '~/components/ResultConfirm.vue';
import YoutubeArea from '~/components/YoutubeArea.vue';

export default {
  data() {
    return {
      newRecord: this.$store.getters['tests/getNewRecord'].newRecord,
      tests: this.$store.getters['tests/getTestsByMode'],
    }
  },
  components: {
    ResultCard,
    ResultFooter,
    ResultSns,
    ResultConfirm,
    YoutubeArea,
  },
}
</script>

<style scoped lang="scss">
.fadeResultCard-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeResultCard-enter, .fade-leave-to {
  opacity: 0;
}
</style>
