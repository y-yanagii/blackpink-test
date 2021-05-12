<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <HistoryBackBtn
          :startPoint="true"
        ></HistoryBackBtn>
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span
              :class="getModeTypeClass.modeTypeTitleClass"
              class="title-logo"
            >
              {{ selectedMode.modeValue + " MODE" }}
            </span>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            outlined
            class="common-mode-button mode-button"
            :class="getModeTypeClass.modeTypeButtonClass"
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
import HistoryBackBtn from "~/components/ui/HistoryBackBtn.vue";

export default {
  data: function() {
    return {
      // 選択した難易度をVuexで取得
      selectedMode: this.$store.getters['localStorages/choiceMode'],
      tests: [],
      show: false,
    }
  },
  methods: {
    testStart() {
      // 検定画面に遷移（テスト開始）
      this.$emit('change-show');
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
    // 難易度による色の設定(easy,normal,hardの場合デフォルト色)
    getModeTypeClass: function() {
      const modeType = this.$data.selectedMode.modeType;

      if (modeType === this.$mode.master) {
        // 難易度MASTERの場合、紫色
        return {
          modeTypeTitleClass: 'title-logo-master',
          modeTypeButtonClass: 'start-button-master',
        }
      } else if (modeType === this.$mode.suddendeath) {
        // 難易度SUDDEN DEATHの場合、赤色
        return {
          modeTypeTitleClass: 'title-logo-suddendeath',
          modeTypeButtonClass: 'start-button-suddendeath',
        }
      } else if (modeType === this.$mode.music) {
        // 難易度MUSICの場合、水青
        return {
          modeTypeTitleClass: 'title-logo-music',
          modeTypeButtonClass: 'start-button-music',
        }
      } else if (modeType === this.$mode.bubble) {
        // BUBBLEの場合、黄緑
        return {
          modeTypeTitleClass: 'title-logo-bubble',
          modeTypeButtonClass: 'start-button-bubble',
        }
      } else if (modeType === this.$mode.puzzle) {
        // PUZZLEの場合、黄緑
        return {
          modeTypeTitleClass: 'title-logo-puzzle',
          modeTypeButtonClass: 'start-button-puzzle',
        }
      } else {
        // 難易度EASY, NORMAL, HARDの場合、デフォルト色
        return {
          modeTypeTitleClass: 'title-logo-default',
          modeTypeButtonClass: 'start-button-default',
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

<style scoped lang="scss">
// 選択した難易度のタイトル領域
.title-logo-master {
  color: $master-color !important;
}
.title-logo-suddendeath {
  color: $suddendeath-color !important;
}
.title-logo-music {
  color: $music-color !important;
}
.title-logo-bubble {
  color: $bubble-color !important;
}
.title-logo-puzzle {
  color: $puzzle-color !important;
}
</style>