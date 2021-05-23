<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <HistoryBackBtn></HistoryBackBtn>
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                {{ $route.query.uid === user.uid ? "MY PROFILE" : "PROFILE" }}
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
                    <template v-if="$route.query.uid === user.uid">
                      <v-img
                        :lazy-src="user.photoURL"
                        max-height="150"
                        max-width="250"
                        :src="user.photoURL"
                      ></v-img>
                    </template>
                    <template v-else>
                      <v-img
                        :lazy-src="showUser.photoURL"
                        max-height="150"
                        max-width="250"
                        :src="showUser.photoURL"
                      ></v-img>
                    </template>
                  </v-avatar>
                </div>
                <div class="user-content">
                  <div>
                    {{ $route.query.uid === user.uid ? user.name : showUser.name }}
                  </div>
                  <div class="twitter-area">
                    <div class="twitter-id">
                      {{ $route.query.uid === user.uid ? '@' + user.twitterId : '@' + showUser.twitterId }}
                    </div>
                    <template v-if="$route.query.uid === user.uid">
                      <v-btn
                        :href="'https://twitter.com/' + user.twitterId"
                        color="skyblue"
                        icon
                      >
                        <v-icon class="twitter">
                          mdi-twitter
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn
                        :href="'https://twitter.com/' + showUser.twitterId"
                        color="skyblue"
                        icon
                      >
                        <v-icon class="twitter">
                          mdi-twitter
                        </v-icon>
                      </v-btn>
                    </template>
                  </div>
                </div>
                <template v-if="$route.query.uid === user.uid">
                  <div class="edit">
                    <v-btn
                      v-if="isEdit === false"
                      @click="isEdit = !isEdit;"
                      icon
                      color="#f4a6b8"
                      class="edit-icon-btn"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      @click="update()"
                      icon
                      color="#87ceeb"
                      class="send-icon-btn"
                    >
                      <v-icon>mdi-send-outline</v-icon>
                    </v-btn>
                  </div>
                </template>
              </div>
              <!-- 紹介文 -->
              <div class="description">
                <div>
                  {{ $route.query.uid === user.uid ? user.description : showUser.description }}
                </div>
              </div>
              <!-- ステータス(プライバシー) -->
              <template v-if="$route.query.uid === user.uid">
                <div class="privacy-area">
                  <div class="privacy-title">
                    STATUS
                  </div>
                  <div class="privacy">
                    <!-- 閲覧モード -->
                    <template v-if="isEdit === false">
                      <div v-if="!user.privacy">
                        <v-icon class="privacy-icon">mdi-earth</v-icon>{{ $privacyText.public }}
                      </div>
                      <div v-else-if="user.privacy">
                        <v-icon class="privacy-icon">mdi-lock-outline</v-icon>{{ $privacyText.private }}
                      </div>
                    </template>
                    <!-- 編集モード -->
                    <template v-else>
                      <!-- public, privateトグルボタン -->
                      <v-btn-toggle
                        v-model="privacyToggle"
                        tile
                        color="#f4a6b8"
                        group
                      >
                        <v-btn
                          @click="setPrivacy($event)"
                          value="false"
                          class="privacy-btn"
                        >{{ $privacyText.public }}</v-btn>
                        <span class="privacy-slash">/</span>
                        <v-btn
                          @click="setPrivacy($event)"
                          value="true"
                          class="privacy-btn"
                        >{{ $privacyText.private }}</v-btn>
                      </v-btn-toggle>
                    </template>
                  </div>
                </div>
                <div class="rank-area">
                  <div class="rank-title">
                    RANK
                  </div>
                  <div class="rank">
                    <div v-if="true" :class="rankClass">
                      <v-icon class="rank-icon">mdi-crown</v-icon>MASTER
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- Twitter情報アップデートボタン -->
          <template v-if="$route.query.uid === user.uid">
            <div class="profile-footer-area">
              <div class="update-twitter-and-logout">
                <v-btn
                  @click="logout()"
                  class="logout-btn"
                ><i class="mdi mdi-logout" />LOGOUT
                </v-btn>
                <v-btn
                  @click="updateTwitter()"
                  target="_blank"
                  class="up-twitter-btn"
                ><i class="mdi mdi-twitter"/>UPDATE
                </v-btn>
              </div>
            </div>
          </template>
          <!-- ランク領域 -->
          <div class="text-left ranking">
            <div class="ranking-title">
              RECORD RANKING
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HistoryBackBtn from '~/components/ui/HistoryBackBtn.vue';
import { mapGetters } from 'vuex';
import { db } from "~/plugins/firebase";

export default {
  data: function() {
    return {
      isEdit: false,
      rankClass: "master",
      privacyToggle: this.$privacyText.public,
      newPrivacy: 0,
      showUser: {},
    }
  },
  computed: {
    // users/getCurrentUserで取得するstoreのuserが取得できたタイミングで、リアクティブに反映させる
    ...mapGetters({ user: "users/getCurrentUser" }),
  },
  methods: {
    update() {
      if (!Number.isInteger(this.newPrivacy)) {
        // ステータスが0以外処理アップデート処理
        // ...mapGettersで使用しているuser自身の値を変更することはNGのためuser情報を再定義
        const newUserInfo = {
          id: this.user.uid,
          name: this.user.name,
          twitterId: this.user.twitterId,
          description: this.user.description,
          photoURL: this.user.photoURL,
          privacy: this.newPrivacy,
        }

        // ユーザ情報をアップデート
        this.$store.dispatch('users/update', newUserInfo);
      }

      // 閲覧モードに戻す
      this.newPrivacy = 0;
      this.isEdit = !this.isEdit;
    },
    setPrivacy($event) {
      // プライバシー選択によってpublicかprivateかを保持しておく
      $event.target.textContent === this.$privacyText.private ? this.newPrivacy = true : this.newPrivacy = false;
    },
    updateTwitter() {
      // Twitterよりユーザの最新情報を取得し保存
    },
    logout() {
      // ログアウト処理(ホーム画面遷移)
      this.$store.dispatch('localStorages/setGuestPlay', false);
      this.$store.dispatch('twitter/logoutTwitter');
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.$store.dispatch('users/init');
    this.$store.dispatch('rankings/init');

    // 選択したユーザ取得
    let docUser = db.collection('users').doc(this.$route.query.uid);
    const _this = this;
    docUser.get().then(function(doc) {
      _this.showUser = doc.data();
    });
  },
  components: {
    HistoryBackBtn,
  }
}
</script>

<style scoped lang="scss">
.profile-template {
  margin-bottom: 6%;
  padding: 4%;
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
    .edit {
      margin: 0 0 0 auto;
      .edit-icon-btn {
        border: solid 2px $base-text-color;
      }
      .send-icon-btn {
        border: solid 2px skyblue;
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
    margin-bottom: 10px;
    .privacy-title {
      text-align: left;
      color: $base-text-color;
    }
    .privacy {
      margin: 4px 0px 0px 15px;
      text-align: left;
      height: 30px;
      div {
        .privacy-icon {
          color: $base-text-color;
          margin-right: 17px;
        }
      }
    }
  }
  .rank-area {
    .rank-title {
      text-align: left;
      color: $base-text-color;
    }
    .rank {
      margin: 4px 0px 0px 15px;
      text-align: left;
      .master {
        color: $master-color;
        .rank-icon {
          color: $master-color;
          margin-right: 17px;
        }
      }
    }
  }
}

.privacy-btn {
  height: 27px !important;
}
.privacy-slash {
  margin: auto 0;
}

// Twitter情報アップデート領域
  .profile-footer-area {
    text-align: right;
    // Twiiterシェア領域
    .update-twitter-and-logout {
      .up-twitter-btn {
        margin: auto auto 5% auto;
        background-color: black !important;
        color: skyblue !important;
        border: solid 2px skyblue;
      }
      .logout-btn {
        margin: auto 3% 5% auto;
        background-color: black !important;
        color: $logout-color !important;
        border: solid 2px $logout-color;
      }
    }
  }

.ranking {
  .ranking-title {
    color: $base-text-color;
    font-size: 20px;
  }
}
</style>
