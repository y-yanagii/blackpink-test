<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <HistoryBackBtn
          :showNumber="$modeNumber.mode"
          @change-show-number="changeShowNumber"
        ></HistoryBackBtn>
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo">
              {{ playModeText }}
            </span>
          </div>
        </div>
        <div class="text-center">
          <transition-group name="fade" appear>
            <v-btn
              v-for="mode in modeButtons"
              :key="mode.modeType"
              :class="setClass(mode.modeType)"
              class="common-mode-button"
              @click="selectMode(mode)"
              outlined
            >
            {{ mode.modeText }}
            </v-btn>
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HistoryBackBtn from "~/components/ui/HistoryBackBtn.vue";
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      modes: [],
    }
  },
  props: ["showNumber", "playModeText"],
  firestore: {
    // 初期表示firestoreのmodesコレクションをモードタイプの昇順で取得
    modes: db.collection("modes").orderBy('modeType')
  },
  methods: {
    selectMode(mode) {
      // 空白除去
      let modeValue = mode.modeText.replace(/\s+/g, "");

      // 難易度選択をvuex-persistedstateを使用し、ローカルストレージ管理
      // dispatchでVuexのactionsを呼ぶ
      this.$store.dispatch('localStorages/selectMode', { modeType: mode.modeType, modeValue: modeValue.toUpperCase(), playType: this.showNumber });

      // 検定スタート画面に遷移
      this.$router.push({ path: "/mode/" + modeValue.toLowerCase() });
    },
    setClass(type) {
      // それぞれの難易度ごとにクラス付与
      if (type === this.$mode.master) {
        // MASTER
        return "master-mode-button"
      } else if (type === this.$mode.suddendeath) {
        // SUDDEN DEATH
        return "suddendeath-mode-button"
      } else if (type === this.$mode.music) {
        // MUSIC
        return "music-mode-button"
      } else if (type === this.$mode.bubble) {
        // BUBBLE
        return "bubble-mode-button"
      } else {
        // EASY, NORMAL, HARD
        return "mode-button"
      }
    },
    changeShowNumber(showNumber) {
      // Mode画面に戻る
      this.$emit('change-show-number', showNumber)
    }
  },
  computed: {
    modeButtons() {
      // 選択したプレイタイプ別にモードの情報をフィルタリングする（TEST or GAME）
      return this.modes.filter(mode => mode.playType === this.showNumber)
    }
  },
  created() {
    // modesコレクションの初期化
    this.$store.dispatch('modes/init');
  },
  components: {
    HistoryBackBtn,
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
