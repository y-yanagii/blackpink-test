<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <div class="text-center">
          <div>
            <div
              v-if="modeType === $mode.music"
              class="number-of-songs"
            >
              NUMBER OF SONGS: {{ getSongCount }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      songsCount: 0,
    }
  },
  props: ["allTests", "modeType"],
  computed: {
    getSongCount: function() {
      // 総曲数を返す
      let musicTests = this.allTests.filter(t => t.modeType === this.$mode.music);
      let songArray = [];
      for (const test of musicTests) {
        for (const option of test.options) {
          // 重複を除外し曲数を取得
          if (!songArray.includes(option.optionContent.replace(/\s+/g, "").toUpperCase())) songArray.push(option.optionContent.replace(/\s+/g, "").toUpperCase());
        }
      }
      
      this.songCount = songArray.length;
      return this.songCount;
    }
  },
}
</script>

<style scoped lang="scss">
.number-of-songs {
  text-align: left;
  margin-left: 3%;
  color: $base-text-color;
}
</style>