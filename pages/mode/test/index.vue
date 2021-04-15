<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time></Time>
        <TestCard :tests="getTests"></TestCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ModeTitle.vue';
import Time from '~/components/Time.vue';
import TestCard from '~/components/TestCard.vue';

export default {
  data: function() {
    return {
      questionIndex: 0,
    }
  },
  computed: {
    // 難易度別にテスト情報取得
    getTests: function() {
      return this.$store.getters['tests/getTestsByMode'];
    },
  },
  components: {
    ModeTitle,
    Time,
    TestCard
  },
  created() {
    // tests情報の初期化
    this.$store.dispatch('tests/init');
  }
}
</script>
