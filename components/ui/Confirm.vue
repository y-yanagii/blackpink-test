<!-- 共通確認ダイアログ -->
<template>
  <v-dialog
    v-model="isDisplay"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        <v-icon>mdi-shield-alert-outline</v-icon>CONFIRM
      </v-card-title>
      <v-card-text>{{ this.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          class="cancel-btn"
          outlined
          @click="toCancelOrToOk(false)"
        >
          <v-icon>mdi-close</v-icon> CANCEL
        </v-btn>
        <v-btn
          elevation="2"
          class="ok-btn"
          outlined
          @click="toCancelOrToOk(true)"
        >
          <v-icon>mdi-check</v-icon> OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      isDisplay: false,
    }
  },
  props: ["message"],
  methods: {
    toCancelOrToOk(dialogAnswer) {
      // OK, キャンセル処理
      this.$emit('confirm-discrimination', dialogAnswer);
    },
  }
}
</script>

<style scoped lang="scss">

</style>
