<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- スウィッチ領域 -->
      <div class="text-right">
        <v-switch
          v-model="colorThema"
          inset
          right
          color="#f4a6b8"
          dark
        ></v-switch>
      </div>
      <!-- タイトルロゴ -->
      <div class="text-center">
        <transition name="fadeLogo" appear>
          <Logo></Logo>
        </transition>
      </div>
      <!-- 初期登録領域 -->
      <div class="text-center">
        <div>
          <v-text-field
            class="username-text"
            label="USERNANE"
            v-model="userName"
            :rules="rules"
            maxlength="50"
            hide-details="auto"
            color="#f4a6b8"
          ></v-text-field>
          <v-btn
            elevation="2"
            icon
            color="#f4a6b8"
          ><i class="mdi mdi-twitter"/></v-btn>
        </div>
        <br>

        <v-btn
          outlined
          class="area-button"
          @click="userNameCheck"
          :disabled="!userName"
          to="/mode"
          nuxt
        >PLAY</v-btn>
        <br><br>

        <span class="base-text-color">or</span>
        <br><br>

        <router-link
          to="/mode"
          active-class="link--active"
          exact
          class="link"
        >GUEST PLAY</router-link>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data: function() {
    return {
      userName: "",
      rules: [
        value => !!value || 'USERNAME is Required.',
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      colorThema: false,
    }
  },
  methods: {
    userNameCheck() {
      if (this.username) {

      }
    }
  },
  components: {
    Logo,
  }
}
</script>

<style scoped lang="scss">
.fadeLogo-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeLogo-enter, .fade-leave-to {
  opacity: 0;
}

.username-text {
  display: inline-block;
  margin: auto;
  width: 53%;
}

.base-text-color {
  display: inline-block;
  margin: auto;
  width: 60%;
  color: $base-text-color;
}

.link {
  font-weight: bold;
  color: $base-text-color;
  width: 60%;
}

</style>