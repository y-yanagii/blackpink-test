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
import { db } from "~/plugins/firebase";
import Ranking from '~/components/Ranking.vue';

export default {
  data() {
    return {
      rankings: []
    }
  },
  components: {
    Ranking
  },
  firestore: {
    // 初期表示時、EASYモードのランキングを取得
    rankings: db.collection("rankings").where('modeType', '==', 0).orderBy('score', 'desc').orderBy('clearTime', 'asc').orderBy('createdAt', 'desc')
  },
  created() {
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  }
}
</script>

<style scoped lang="scss">

</style>
