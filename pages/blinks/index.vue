<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                BLINKS
              </span>
            </div>
          </div>
          <div class="text-center">
            <div class="blinks">
              <div
                v-for="user in users"
                :key="user.id"
                @click="showBlink(user)"
                class="blink"
              >
                <div class="user-common">
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
                <div class="user-name user-common">
                  {{ user.name }}
                </div>
                <v-btn
                  :href="'https://twitter.com/' + user.twitterId"
                  color="skyblue"
                  icon
                  class="user-common twitter-btn"
                >
                  <v-icon class="twitter">
                    mdi-twitter
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js';

export default {
  data: function() {
    return {
      users: [],
    }
  },
  firestore: {
    // publicなユーザを全件取得
    users: db.collection("users").where('privacy', '==', false),
  },
  methods: {
    showBlink(user) {
      // ユーザ詳細画面に遷移
      this.$router.push({ path: '/blinks/profile', query: {uid: user.id, twitterId: user.twitterId} })
    }
  },
  created() {
    this.$store.dispatch('users/init');
  }
}
</script>

<style scoped lang="scss">
.blink {
  margin: 2% 4%;
  text-align: left;
}

.user-common {
  display: inline-block;
}

.user-name {
  vertical-align: middle;
  max-width: 68%;
  min-width: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: $base-text-color;
}

.twitter-btn {
  padding: 6px;
  color: skyblue !important;
}
</style>
