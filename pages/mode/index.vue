<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo">
              MODE
            </span>
          </div>
        </div>
        <div class="text-center">
          <!-- computedに定義した配列オブジェクトをv-forで回しバインディングを設定 -->
          <transition-group name="fade" appear>
          <v-btn
            v-for="mode in modes"
            :key="mode.modeType"
            :class="setClass(mode.modeType)"
            class="common-mode-button"
            @click="selectMode(mode)"
            outlined
          >
          {{ mode.modeValue }}
          </v-btn>
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      modes: [],
    }
  },
  firestore: {
    // 初期表示firestoreのmodesコレクションをモードタイプの昇順で取得
    modes: db.collection("modes").orderBy('modeType')
  },
  methods: {
    selectMode(mode) {
      // 難易度選択を保持
      // dispatchでVuexのactionsを呼ぶ
      this.$store.dispatch('modes/selectMode', { modeType: mode.modeType, modeValue: mode.modeValue });

      // 検定スタート画面に遷移
      this.$router.push({ path: "/mode/" + mode.modeValue.replace(/\s+/g, "").toLowerCase() });
    },
    setClass(type) {
      // それぞれの難易度ごとにクラス付与
      if (type === 3) {
        // MASTER
        return "master-mode-button"
      } else if (type === 4) {
        // SUDDEN DEATH
        return "suddendeath-mode-button"
      } else {
        // EASY, NORMAL, HARD
        return "mode-button"
      }
    }
  },
  created() {
    // modesコレクションの初期化
    this.$store.dispatch('modes/init');
  },
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
