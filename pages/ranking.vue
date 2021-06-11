<template>
  <div>
    <v-row justify="center" align="center" class="ranking">
      <v-col cols="12" sm="8" md="6">
        <Ranking
          :rankings="rankings"
          :battles="battles"
          @selected-mode="changeModeType"
        ></Ranking>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import Ranking from '~/components/rankings/Ranking.vue';

export default {
  data() {
    return {
      rankings: [],
      battles: [],
    }
  },
  methods: {
    changeModeType(value) {
      // 難易度別にランキングを取得（）
      this.$bind('rankings', db.collection("rankings").where('modeType', '==', value.modeType).orderBy('score', 'desc').orderBy('clearTime').orderBy('createdAt', 'desc').limit(20))
    }
  },
  components: {
    Ranking
  },
  firestore: {
    // 初期表示時、EASYモードのランキングを取得
    rankings: db.collection("rankings").where('modeType', '==', 0).orderBy('score', 'desc').orderBy('clearTime').orderBy('createdAt', 'desc').limit(20),
    battles: db.collection("battles").orderBy('win', 'desc').limit(21),
  },
  mounted() {
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
}
</script>

<style scoped lang="scss">
.ranking {
  height: 100%;
  // background: linear-gradient(63deg,pink 50%,pink 50%,black 50%,black 50%) !important;
}
</style>