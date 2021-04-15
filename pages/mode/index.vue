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
            v-for="modeButton in modeButtons"
            :key="modeButton.textContent"
            :class="modeButton.class"
            class="common-mode-button"
            @click="selectMode($event)"
            outlined
          >
          {{ modeButton.textContent }}
          </v-btn>
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    }
  },
  methods: {
    // 難易度選択を保持
    selectMode(event) {
      // dispatchでVuexのactionsを呼ぶ
      // replaceで文字列中の空白除去
      this.$store.dispatch('mode/selectMode', event.target.textContent.replace(/\s+/g, ""));

      // 検定スタート画面に遷移
      this.$router.push({ path: "/mode/start" });
    }
  },
  computed: {
    modeButtons() {
      // EASY, NORMAL, HARD, MASTER, SUDDEN DEATHのボタンオブジェクトを配列で定義
      return [
        { class: "mode-button", textContent: "E A S Y" },
        { class: "mode-button", textContent: "N O R M A L" },
        { class: "mode-button", textContent: "H A R D" },
        { class: "master-mode-button", textContent: "M A S T E R" },
        { class: "suddendeath-mode-button", textContent: "SUDDEN DEATH" },
      ]
    }
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