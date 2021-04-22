<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <Ranking
          :rankings="rankings"
        ></Ranking>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Ranking from '~/components/Ranking.vue';

export default {
  data() {
    return {
      rankings: []
    }
  },
  components: {
    Ranking
  }
}
</script>

<style scoped lang="scss">

</style>
