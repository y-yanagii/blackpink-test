<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                PROFILE
              </span>
            </div>
          </div>
          <!-- プロフィール領域 -->
          <div class="text-center">
            <div class="profile-template">
              <div class="avater-name">
                <div class="avatar">
                  <v-avatar
                    size="56"
                  >
                    <v-img
                      :lazy-src="user.photoURL"
                      max-height="150"
                      max-width="250"
                      :src="user.photoURL"
                    ></v-img>
                  </v-avatar>
                </div>
                <div>
                  <div>{{ user.name }}</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <!-- ランク領域 -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        uid: "",
        name: "",
        twitterId: "",
        description: "",
        photoURL: "",
        privacy: false,
      }
    }
  },
  computed: {
    getUser() {
      console.log("getUser");
    }
  },
  mounted() {
    // ユーザ情報取得
    let currentUser = this.$store.getters['users/getCurrentUser'];
    this.user.uid = currentUser.uid;
    this.user.name = currentUser.name;
    this.user.twitterId = currentUser.twitterId;
    this.user.description = currentUser.description;
    this.user.photoURL = currentUser.photoURL;
    this.user.privacy = currentUser.privacy;
  },
  created() {
    this.$store.dispatch('users/init');
  },
}
</script>

<style scoped lang="scss">
.profile-template {
  padding: 3%;
  width: 100%;
  border: solid 2px $base-text-color;
  border-radius: 6px;
  .avater-name {
    padding: 3%;
    display: flex;
    .avatar {
      margin-right: 12px;
    }
  }
}
</style>
