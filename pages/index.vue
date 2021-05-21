<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- 通知のスナックバー -->
      <v-snackbar
        :value="snackbar"
        :timeout="2000"
        absolute
        centered
        color="#f4a6b8"
        elevation="24"
        :top="true"
        :right="true"
      >{{ snackbarText }}</v-snackbar>
      <!-- スウィッチ領域 -->
      <!-- <div class="text-right">
        <v-switch
          v-model="colorThema"
          inset
          right
          color="#f4a6b8"
          dark
        ></v-switch>
      </div> -->
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
        </div>
        <br>
        <!-- PLAY -->
        <v-btn
          class="area-button"
          @click="showTermsOfUse()"
          outlined
        >
          PLAY<i class="mdi mdi-twitter twitter-icon" />
        </v-btn>
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
      <TermsDialog
        ref="termsdlg"
        @terms-discrimination="oauthTwitter"
      ></TermsDialog>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/defaults/Logo.vue';
import Confirm from '~/components/ui/Confirm.vue';
import TermsDialog from '~/components/ui/TermsDialog.vue';

export default {
  data: function() {
    return {
      termsOfUseDisplay: false,
      userName: this.$store.getters['localStorages/getUserName'],
      rules: [
        value => !!value || 'USERNAME is Required.',
        value => (value && value.length <= 15) || 'Max 15 characters',
      ],
      colorThema: false,
      isDisplay: false,
      message: `You may not be able to play
      some games. Is that OK?`,
      snackbar: false,
      snackbarText: "",
    }
  },
  methods: {
    setUserName() {
      this.$store.dispatch('localStorages/setUserName', this.userName)
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
    },
    showTermsOfUse() {
      // 認証済みの場合、そのまま画面遷移。それ以外利用規約画面表示(リロード対応)
      this.$router.push({ path: "/mode" });

      // ログイン前の利用規約を表示する
      this.$refs.termsdlg.termsOfUseDisplay = true;
      this.$refs.termsdlg.check = false;
    },
    oauthTwitter() {
      // Twitter認証処理
      this.$store.dispatch('twitter/loginTwitter');
      // 利用規約ダイアログを閉じる
      console.log("oauthTwitter");
      this.$refs.termsdlg.termsOfUseDisplay = false;
      this.$refs.termsdlg.check = false;
      // ゲストモードをoff
      this.$store.dispatch('localStorages/setGuestPlay', false);
      this.snackbarText = this.$signMessages.login;
      this.snackbar = true;
    }
  },
  
  components: {
    Logo,
    Confirm,
    TermsDialog,
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
