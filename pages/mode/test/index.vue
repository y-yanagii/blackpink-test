<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time></Time>
        <TestCard :tests="tests"></TestCard>
        <ul>
          <li v-for="(test, index) in tests" :key="index">{{test}}</li>
        </ul>
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
      
    }
  },
  props: {
    tests: Object
  },
  components: {
    ModeTitle,
    Time,
    TestCard
  },
  created() {
    console.log(this);
  }
}
</script>
