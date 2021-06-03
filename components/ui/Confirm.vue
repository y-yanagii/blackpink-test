<!-- 共通確認ダイアログ -->
<template>
  <v-dialog
    v-model="isDisplay"
    persistent
    max-width="290"
  >
    <v-card class="confirm-card">
      <v-card-title class="headline confirm-title">
        <v-icon>mdi-shield-alert-outline</v-icon>CONFIRM
      </v-card-title>
      <v-card-text class="confirm-message">
        {{ this.message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          class="cancel-btn"
          @click="toCancelOrToOk(false)"
        >
          <v-icon>mdi-close</v-icon> CANCEL
        </v-btn>
        <v-btn
          elevation="2"
          class="ok-btn"
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
.confirm-card {
  background-color: $base-bg-color;
  border: solid 2px $base-text-color;
  border-radius: 7px;
  i {
    color: $base-text-color;
  }
  .confirm-title {
    color: $base-text-color;
  }
  .confirm-message {
    padding: 0 !important;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.cancel-btn {
  background-color: $base-bg-color !important;
  color: $base-text-color;
}
.ok-btn {
  background-color: $base-bg-color !important;
  color: $base-text-color;
}
</style>
