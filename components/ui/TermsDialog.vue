<template>
  <v-dialog
    v-model="termsOfUseDisplay"
    scrollable
    class="terms-dialog"
    max-width="500"
  >
    <v-card class="terms-card">
      <v-card-title class="terms-card-title">TERMS OF USE</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="terms-card-text">
        <Terms></Terms>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="terms-card-actions">
        <div class="terms-check">
          <v-checkbox
            v-model="check"
            label="ACCEPT"
            class="terms-check-box"
            color="#f4a6b8"
          ></v-checkbox>
        </div>
        <div class="terms-btn">
          <v-btn
            class="terms-cancel"
            text
            @click="termsOfUseDisplay = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            class="terms-ok"
            text
            @click="oauthTwitter()"
            :disabled="!check"
          >
            CONTINUE
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Terms from '~/components/ui/Terms.vue';

export default {
  data: function() {
    return {
      termsOfUseDisplay: false,
      check: false,
    }
  },
  methods: {
    oauthTwitter() {
      // Twitter認証
      this.$emit('terms-discrimination');
    }
  },
  components: {
    Terms
  },
}
</script>

<style scoped lang="scss">
.terms-card {
  border: solid 2px $base-text-color;
}

.terms-card-title {
  color: $base-text-color;
}

.terms-card-text {
  padding-top: 20px !important;
}

.terms-card-actions {
  display: inline;
  width: 100%;
}

.terms-check {
  margin-bottom: 5px;
  width: 100%;
  text-align: right;
  .terms-check-box {
    margin: auto 15px auto auto;
    display: -webkit-inline-box;
  }
}

.terms-btn {
  width: 100%;
  text-align: right;
}

.terms-cancel {
  color: $base-text-color;
}

.terms-ok {
  color: $base-text-color;
}
</style>
