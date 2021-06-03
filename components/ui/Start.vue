<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <HistoryBackBtn
          @back-click="back"
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
        <div class="text-center">
          <template v-if="selectedMode.modeType === $mode.easy">
            <!-- easyテストの場合注意書き -->
            <div class="test-precautionary text-center">
              <p>＊毎回出題内容が変わります。</p>
              <p>＊最も簡単な難易度です。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.normal">
            <!-- normalテストの場合注意書き -->
            <div class="test-precautionary text-center">
              <p>＊毎回出題内容が変わります。</p>
              <p>＊EASYの１つ上の難易度です。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.hard">
            <!-- hardテストの場合注意書き -->
            <div class="test-precautionary text-center">
              <p>＊毎回出題内容が変わります。</p>
              <p>＊HARDの１つ上の難易度です。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.music">
            <!-- musicテストの場合注意書き -->
            <div class="music-precautionary text-center">
              <p>♬音量注意。毎回出題内容が変わります。</p>
              <p>♬再生されない場合は、ブラウザを<br>アップデートしてください。</p>
              <p>♬使用している音源は、iTunes Storeから<br>提供さている試聴データです。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.master">
            <!-- masterテストの場合注意書き -->
            <div class="master-precautionary text-center">
              <p>＊毎回出題内容が変わります。</p>
              <p>＊最も高い難易度です。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.suddendeath">
            <!-- suddendeathテストの場合注意書き -->
            <div class="suddendeath-precautionary text-center">
              <p>＊全てのテストが出題されます。</p>
              <p>＊毎回出題内容が変わります。</p>
              <p>＊3回間違えた時点で終了です。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.bubble">
            <!-- bubbleテストの場合注意書き -->
            <div class="bubble-precautionary text-center">
              <p>＊隣接する同じ色の泡を消しポイントを稼ぐゲームです。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.puzzle">
            <!-- puzzleテストの場合注意書き -->
            <div class="puzzle-precautionary text-center">
              <p>＊9マスのパズルゲームです。</p>
            </div>
          </template>
          <template v-else-if="selectedMode.modeType === $mode.oneonone">
            <!-- 1on1の場合注意書き -->
            <div class="oneonone-precautionary text-center">
              <p>＊通信環境が良い場所で対戦を行ってください。</p>
              <p>＊対戦中は画面のリロードやブラウザを閉じる行為は行わないでください。</p>
              <p>＊一定時間経過しても応答がない場合は、不戦負扱いとなるため注意してください。</p>
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { db } from "~/plugins/firebase";
import HistoryBackBtn from '~/components/ui/HistoryBackBtn.vue';

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
      this.$emit('change-show', 'start');
    },
    back() {
      this.$router.push({ path: "/mode" });
    },
  },
  // firestore: {
  //   // firestoreのtestsコレクションを取得
  //   // tests: db.collection("tests")
  // },
  computed: {
    // 難易度別にテスト情報取得
    // getTests: function() {
    //   return this.$store.getters['tests/getTestsByMode'];
    // },
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
      } else if (modeType === this.$mode.oneonone) {
        // 1ON1の場合、黄緑
        return {
          modeTypeTitleClass: 'title-logo-oneonone',
          modeTypeButtonClass: 'start-button-oneonone',
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
    // this.$store.dispatch('tests/init');
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
.title-logo-oneonone {
  color: $oneonone-color !important;
}

.test-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $base-text-color;
}

.master-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $master-color;
}

.suddendeath-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $suddendeath-color;
}

.music-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $music-color;
}
.oneonone-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $oneonone-color;
}
.bubble-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $bubble-color;
}
.puzzle-precautionary {
  margin: 40px auto auto auto;
  width: 80%;
  font-size: 14px;
  color: $puzzle-color;
}
</style>