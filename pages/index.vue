<template>
  <v-row justify="center" align="center" class="first-view" style="height: 104%; background: linear-gradient(289deg,#ffc5cf 50%,#ffc5cf 50%,black 50%,black 50%) !important;">
    <v-col cols="12" sm="8" md="6">
      <!-- 通知のスナックバー -->
      <v-snackbar
        :value="snackbar"
        :timeout="3000"
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
      <div class="text-center play-btn-area">
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
import firebase from '~/plugins/firebase';

export default {
  data: function() {
    return {
      termsOfUseDisplay: false,
      // userName: this.$store.getters['localStorages/getUserName'],
      // rules: [
      //   value => !!value || 'USERNAME is Required.',
      //   value => (value && value.length <= 15) || 'Max 15 characters',
      // ],
      colorThema: false,
      isDisplay: false,
      message: `ランキング登録が行われません。
      よろしいですか?`,
      snackbar: false,
      snackbarText: "",
    }
  },
  methods: {
    fromGuestToMode() {
      // 認証チェック
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          // 認証されていない場合ダイアログを表示
          this.$refs.dlg.isDisplay = true;
        } else {
          // 認証済みの場合ログアウトを促す
          this.snackbar = true;
          this.snackbarText = this.$signMessages.promptToLogout;
        }
      });
    },
    confirm(dialogFlag) {
      // 確認ダイアログのOK、キャンセル判定処理
      this.$refs.dlg.isDisplay = false;
      if (dialogFlag) {
        // 確認ダイアログのOKの場合true、キャンセルの場合false
        // ログアウト処理もしておく。
        this.$store.dispatch('localStorages/setGuestPlay', dialogFlag);
        this.$store.dispatch('localStorages/setUserNameTwitterId', { name: this.$guest.userName, twitterId: this.$guest.twitterId });
        this.$router.push({ path: "/mode" });
      }
    },
    showTermsOfUse() {
      if (!this.$store.getters["localStorages/getGuestPlay"]) {
        // ゲストモード時は利用規約を表示させる
        // 認証済みの場合、そのまま画面遷移。それ以外利用規約画面表示(リロード対応)
        this.$router.push({ path: "/mode" });
      }

      // ログイン前の利用規約を表示する
      this.$refs.termsdlg.termsOfUseDisplay = true;
      this.$refs.termsdlg.check = false;
    },
    oauthTwitter() {
      let _this = this;
      // ユーザ登録後に呼び出すコールバック関数（ダイアログを閉じる、スナックバー通知、ステータス登録）
      const auterAuthenticationFunc = function() {
        // 利用規約ダイアログを閉じる
        console.log("oauthTwitter");
        _this.$refs.termsdlg.termsOfUseDisplay = false;
        _this.$refs.termsdlg.check = false;
        // ゲストモードをoff
        _this.$store.dispatch('localStorages/setGuestPlay', false);
        // ログイン済み通知
        _this.snackbarText = _this.$signMessages.login;
        _this.snackbar = true;
      }

      // Twitter認証処理(ユーザ情報登録も担う)
      this.$store.dispatch('twitter/loginTwitter', auterAuthenticationFunc);
    }
  },
  mounted() {
    // メッセージチェック
    let message = this.$store.getters['messages/getSnackbarText'];
    if (message === this.$signMessages.logout
    || message === this.$signMessages.pleaseLogin) {
      // 「ログアウトしました」、または「ログインしてください」を表示
      this.snackbarText = message;
      this.snackbar = true;
    }
  },
  watch: {
    snackbar(newBool) {
      if (newBool) {
        // 2秒後falseにスナックメッセージを初期化
        setTimeout(() => {
          this.snackbar = false; // 初期化
          this.$store.dispatch('messages/setSnackbarText', "");
        }, 3000);
      }
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
.first-view {
  height: 100%;
}

.fadeLogo-enter-active, .fade-leave-active {
  transition: opacity 3.5s;
}
.fadeLogo-enter, .fade-leave-to {
  opacity: 0;
}

.play-btn-area {
  margin-top: 45%;
}

// .username-text {
//   display: inline-block;
//   margin: auto;
//   width: 53%;
// }

.base-text-color {
  display: inline-block;
  margin: auto;
  width: 60%;
  color: #272727;
}

.link {
  width: 60%;
  font-weight: bold;
  background-color: rgba(255,0,0,0.0) !important;
  box-shadow: none;
  color: #272727;
  text-decoration: underline !important;
}
</style>
