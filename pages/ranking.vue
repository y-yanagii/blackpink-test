<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <Ranking
          :rankings="rankings"
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
    }
  },
  methods: {
    changeModeType(value) {
      // 難易度別にランキングを取得（）
      this.$bind('rankings', db.collection("rankings").where('modeType', '==', value.modeType).orderBy('score', 'desc').orderBy('clearTime').orderBy('createdAt', 'desc'))
    }
  },
  components: {
    Ranking
  },
  firestore: {
    // 初期表示時、EASYモードのランキングを取得
    rankings: db.collection("rankings").where('modeType', '==', 0).orderBy('score', 'desc').orderBy('clearTime').orderBy('createdAt', 'desc'),
  },
  mounted() {
    // rankingsコレクションの初期化
    this.$store.dispatch('rankings/init');
  },
}
</script>
