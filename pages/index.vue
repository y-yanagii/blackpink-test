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
        <!-- USERNAME領域 -->
        <div>
          <v-text-field
            class="username-text"
            label="USERNANE"
            v-model="userName"
            :rules="rules"
            @blur="setUserName"
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
        <!-- PLAY -->
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
        <!-- GUESTボタン -->
        <v-btn
          @click.native="fromGuestToMode()"
          active-class="link--active"
          class="link"
        >PLAY AS GUEST</v-btn>
      </div>
      <Confirm
        ref="dlg"
        :message="message"
        @confirm-discrimination="confirm"
      ></Confirm>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Confirm from '~/components/ui/Confirm.vue';

export default {
  data: function() {
    return {
      userName: this.$store.getters['localStorages/getUserName'],
      rules: [
        value => !!value || 'USERNAME is Required.',
        value => (value && value.length <= 15) || 'Max 15 characters',
      ],
      colorThema: false,
      isDisplay: false,
      message: `You may not be able to play
      some games. Is that OK?`,
    }
  },
  methods: {
    setUserName() {
      this.$store.dispatch('localStorages/setUserName', this.userName)
    },
    userNameCheck() {
    },
    fromGuestToMode() {
      this.$refs.dlg.isDisplay = true;
    },
    confirm(dialogFlag) {
      // 確認ダイアログのOK、キャンセル判定処理
      this.$refs.dlg.isDisplay = false;
      if (dialogFlag) {
        // 確認ダイアログのOKの場合true、キャンセルの場合false
        this.$store.dispatch('localStorages/setGuestPlay', dialogFlag);
        this.$router.push({ path: "/mode" });
      }
    }
  },
  components: {
    Logo,
    Confirm,
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
  width: 60%;
  font-weight: bold;
  background-color: #121212 !important;
  color: $base-text-color;
  text-decoration: underline !important;
}

</style>
