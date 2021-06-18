<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition name="fadeResultCard" appear>
          <ResultBatlleCard
            v-if="res.battleResult"
            :battleResult="res.battleResult"
          ></ResultBatlleCard>
          <ResultCard
            v-else-if="res.battleResult == ''"
            :res="res"
          ></ResultCard>
        </transition>
        <ResultSns></ResultSns>
        <ResultFooter></ResultFooter>
        <ResultConfirm
          v-if="res.battleResult == ''"
          :res="res"
        ></ResultConfirm>
        <YoutubeArea
          :youtubes="youtubes"
        ></YoutubeArea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResultBatlleCard from '~/components/results/ResultBatlleCard.vue';
import ResultCard from '~/components/results/ResultCard.vue';
import ResultFooter from '~/components/results/ResultFooter.vue';
import ResultSns from '~/components/results/ResultSns.vue';
import ResultConfirm from '~/components/results/ResultConfirm.vue';
import YoutubeArea from '~/components/ui/YoutubeArea.vue';
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      battleResult: this.$store.getters['localStorages/getBattleResult'],
      res: {
        name: "",
        modeType: 0,
        modeValue: "",
        card: {
          rank: 0,
          score: 0,
          clearTime: 0,
          message: "",
        },
        myCorrects: [],
        tests: [],
        createdAt: 0,
      },
      youtubes: [
        { orderNum: 0, videoId: "" },
        { orderNum: 1, videoId: "" },
        { orderNum: 2, videoId: "" },
        { orderNum: 3, videoId: "" },
        { orderNum: 4, videoId: "" },
      ]
    }
  },
  async created() {
    // 結果をコレクションより取得
    // uidの取得
    const uid = this.$store.getters['users/getUid'];
    const _this = this;
    await db.collection("results").doc(uid).get().then(function(doc) {
      return new Promise(resolve => {
        _this.res = doc.data();
        resolve();
      });
    });
  },
  firestore: {
    // おすすめyoutube動画
    youtubes: db.collection("youtubes").orderBy('orderNum', 'asc'),
  },
  async asyncData(context) {
    // // youtube data apiを使用しblackpinkチェンネルから最新のデータを取得
    // // blackpinkのYouTubeチャンネルURL
    // const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + process.env.BLACKPINK_CHANNEL_ID + "&maxResults=5&order=date&type=video&key=" + process.env.YOUTUBE_DATA_API_V3_KEY;
    // // リクエストGet
    // const response = await context.$axios.$get(url);
    // return { items: response["items"] }
  },
  components: {
    ResultBatlleCard,
    ResultCard,
    ResultFooter,
    ResultSns,
    ResultConfirm,
    YoutubeArea,
  },
}
</script>

<style scoped lang="scss">
// 全体の背景色
.row.align-center.justify-center {
  // background: linear-gradient(80deg,pink 50%,pink 50%,black 50%,black 50%) !important;
}

.fadeResultCard-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeResultCard-enter, .fade-leave-to {
  opacity: 0;
}
</style>
