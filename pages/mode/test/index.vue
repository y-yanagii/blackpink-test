<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time></Time>
        <TestCard
          :currentTest="currentTest"
          :test="tests[currentTest]"
        ></TestCard>
        <v-btn @click="add()">次の問題</v-btn>
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
      currentTest: 0,
      tests: this.$store.getters['tests/getTestsByMode'],
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
  methods: {
    add() {
      this.currentTest++
      let targetElement = this.$el;
        debugger
    }
  },
  created() {
    // tests情報の初期化
    this.$store.dispatch('tests/init');
  }
}
</script>
