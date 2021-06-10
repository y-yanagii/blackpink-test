<template>
  <v-dialog
    v-model="twitterDisplay"
    max-width="565px"
  >
    <v-card class="user-update-card">
      <v-card-title class="headline user-update-title">
        <p>Do you want to update your user information?<i class="mdi mdi-twitter"/></p>
      </v-card-title>
      <v-card-text class="user-update-message">
        <p>以下の情報をTwitterから取得し、ユーザー情報の更新を行います。</p>
        <ul>
          <li>ユーザー名</li>
          <li>プロフィール画像</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          class="cancel-btn"
          @click="twitterDisplay = false"
        >CANCEL</v-btn>
        <v-btn
          elevation="2"
          class="ok-btn"
          @click="updateUser()"
        >OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      twitterDisplay: false,
    }
  },
  methods: {
    updateUser() {
      this.$emit('agreement-update');
    }
  },
}
</script>

<style scoped lang="scss">
.user-update-card {
  background-color: $base-glay;
  border: solid 2px $base-text-color;
}

.user-update-title {
  color: $base-text-color;
}
</style>
