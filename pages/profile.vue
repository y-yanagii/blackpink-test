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
              <!-- プロフィール画像とユーザ名 -->
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
                <div class="user-content">
                  <div>{{ user.name }}</div>
                  <div class="twitter-area">
                    <div class="twitter-id">
                      {{ '@' + user.twitterId }}
                    </div>
                    <v-btn
                      :href="'https://twitter.com/' + user.twitterId"
                      color="skyblue"
                      icon
                    >
                      <v-icon class="twitter">
                        mdi-twitter
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <!-- 紹介文 -->
              <div class="description">
                <div>
                  {{ user.description }}
                </div>
              </div>
              <!-- ステータス(プライバシー) -->
              <div class="privacy-area">
                <div class="privacy-title">
                  STATUS
                </div>
                <div class="privacy">
                  <div v-if="!user.privacy">
                    <v-icon class="privacy-icon">mdi-earth</v-icon>{{ $privacyText.public }}
                  </div>
                  <div v-else-if="user.privacy">
                    <v-icon class="privacy-icon">mdi-lock-outline</v-icon>{{ $privacyText.private }}
                  </div>
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
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {}
  },
  computed: {
    // users/getCurrentUserで取得するstoreのuserが取得できたタイミングで、リアクティブに反映させる
    ...mapGetters({ user: "users/getCurrentUser" }),
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
    margin-bottom: 10px;
    padding: 3%;
    display: flex;
    .avatar {
      margin-right: 12px;
    }
    .user-content {
      text-align: left;
      // div:nth-of-type(1) {
         // color: $base-text-color;
      // }
      .twitter-area {
        display: flex;
        .twitter-id {
          margin-top: 6px;
          margin-right: 5px;
          color: rgba(138, 138, 138, 0.6);
        }
        .twitter {
          color: skyblue;
        }
      }
    }
  }
  .description {
    margin-bottom: 10px;
    div {
      text-align: left;
      // color: $base-text-color;
    }
  }
  .privacy-area {
    .privacy-title {
      text-align: left;
      color: $base-text-color;
    }
    .privacy {
      margin: 4px 0px 0px 15px;
      text-align: left;
      div {
        .privacy-icon {
          color: $base-text-color;
          margin-right: 17px;
        }
      }
    }
  }
}
</style>
