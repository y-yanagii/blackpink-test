<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ResultCard
          :answerInfo="answerInfo"
        ></ResultCard>
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
      answerInfo: this.$store.getters['tests/getAnswerInfo']
    }
  },
  components: {
    ResultCard,
    ResultFooter,
    ResultSns
  },
}
</script>
