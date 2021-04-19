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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResultCard from '~/components/ResultCard.vue';
import ResultFooter from '~/components/ResultFooter.vue';
import ResultSns from '~/components/ResultSns.vue';

export default {
  data() {
    return {
      newRecord: this.$store.getters['tests/getNewRecord'].newRecord
    }
  },
  components: {
    ResultCard,
    ResultFooter,
    ResultSns
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
