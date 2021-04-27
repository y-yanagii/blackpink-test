<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <HistoryBackBtn></HistoryBackBtn>
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo" :style="{'color': getStyleColor.color}">
              {{ selectedMode.modeValue.replace(/\s+/g, "") + " MODE"}}
            </span>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            outlined
            class="common-mode-button mode-button"
            :style="{'border': getStyleColor.border}"
            @click="testStart()"
            nuxt
          >TEST START!</v-btn>
        </div>
        <div></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { db } from "~/plugins/firebase";
import HistoryBackBtn from "~/components/HistoryBackBtn.vue";

export default {
  data: function() {
    return {
      // 選択した難易度をVuexで取得
      selectedMode: this.$store.getters['modes/choiceMode'],
      tests: [],
      show: false,
    }
  },
  methods: {
    testStart() {
      // 検定画面に遷移（テスト開始）
      this.$emit('change-show')
    }
  },
  firestore: {
    // firestoreのtestsコレクションを取得
    // tests: db.collection("tests")
  },
  computed: {
    // 難易度別にテスト情報取得
    getTests: function() {
      return this.$store.getters['tests/getTestsByMode'];
    },
    // 難易度による色の設定
    getStyleColor: function() {
      if (this.$data.selectedMode.modeType === 3) {
        // 難易度MASTERの場合、紫色
        return {
          'color': '#A700FF',
          'border': 'solid 2px #A700FF'
        }
      } else if (this.$data.selectedMode.modeType === 4) {
        // 難易度MASTERの場合、赤色
        return {
          'color': '#FF0000',
          'border': 'solid 2px #FF0000'
        }
      } else {
        // 難易度EASY, NORMAL, HARDの場合、ピンク
        return {
          'color': '#f4a6b8',
          'border': 'solid 2px #f4a6b8'
        }
      }
    }
  },
  created() {
    // tests情報の初期化
    this.$store.dispatch('tests/init');
  },
  components: {
    HistoryBackBtn
  }
}
</script>
