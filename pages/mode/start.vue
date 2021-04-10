<!-- 難易度選択領域 -->
<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <!-- タイトルロゴ -->
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo" :style="{'color': getStyleColor.color}">
              {{ selectedMode + " MODE"}}
            </span>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            outlined
            class="common-mode-button mode-button"
            :style="{'border': getStyleColor.border}"
          >TEST START!</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // 選択した難易度をVuexで取得
      selectedMode: this.$store.getters['mode/choiceMode'],
    }
  },
  computed: {
    // 難易度による色の設定
    getStyleColor: function() {
      if (this.$data.selectedMode === 'MASTER') {
        // 難易度MASTERの場合、紫色
        return {
          'color': '#A700FF',
          'border': 'solid 1px #A700FF'
        }
      } else if (this.$data.selectedMode === 'SUDDENDEATH') {
        // 難易度MASTERの場合、赤色
        return {
          'color': '#FF0000',
          'border': 'solid 1px #FF0000'
        }
      }
    }
  }
}
</script>
