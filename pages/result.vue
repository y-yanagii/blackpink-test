<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition name="fadeResultCard" appear>
          <ResultBatlleCard
            v-if="battleResult"
            :battleResult="battleResult"
          ></ResultBatlleCard>
          <ResultCard
            v-else
            :newRecord="newRecord"
          ></ResultCard>
        </transition>
        <ResultSns></ResultSns>
        <ResultFooter></ResultFooter>
        <ResultConfirm
          v-if="!battleResult"
          :newRecord="newRecord"
          :tests="tests"
        ></ResultConfirm>
        <YoutubeArea
          :items="items"
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

export default {
  data() {
    return {
      newRecord: this.$store.getters['localStorages/getNewRecord'].newRecord,
      tests: this.$store.getters['localStorages/getTargetTests'],
      battleResult: this.$store.getters['localStorages/getBattleResult']
    }
  },
  async asyncData(context) {
    // youtube data apiを使用しblackpinkチェンネルから最新のデータを取得
    // blackpinkのYouTubeチャンネルURL
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + process.env.BLACKPINK_CHANNEL_ID + "&maxResults=5&order=date&type=video&key=" + process.env.YOUTUBE_DATA_API_V3_KEY;
    // リクエストGet
    const response = await context.$axios.$get(url);
    return { items: response["items"] }
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
  background: linear-gradient(80deg,pink 50%,pink 50%,black 50%,black 50%) !important;
}

.fadeResultCard-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeResultCard-enter, .fade-leave-to {
  opacity: 0;
}
</style>
