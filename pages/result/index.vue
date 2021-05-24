<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <transition name="fadeResultCard" appear>
          <ResultCard
            :newRecord="newRecord"
          ></ResultCard>
        </transition>
        <ResultSns></ResultSns>
        <ResultFooter></ResultFooter>
        <ResultConfirm
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
    ResultCard,
    ResultFooter,
    ResultSns,
    ResultConfirm,
    YoutubeArea,
  },
}
</script>

<style scoped lang="scss">
.fadeResultCard-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeResultCard-enter, .fade-leave-to {
  opacity: 0;
}
</style>
