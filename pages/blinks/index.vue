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
                class="blink"
              >
                <div>
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
                <div>{{ user.name }}</div>
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

  },
  created() {
    this.$store.dispatch('users/init');
  }
}
</script>

<style scoped lang="scss">

</style>
