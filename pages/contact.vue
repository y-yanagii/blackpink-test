<template>
  <div style="height: 100%;">
    <v-row justify="center" align="center" class="contact">
      <v-col cols="12" md="6" class="contact-child">
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                CONTACT
              </span>
            </div>
          </div>

          <div class="text-center">
            <!-- お問い合わせ領域 -->
            <div class="contact-card text-center">
              <ValidationObserver ref="obs" v-slot="{ invalid }">
                <v-form @submit.prevent="submit">
                  <div class="contact-icons">
                    <div>
                      <v-btn
                        icon
                        @click="show = !show"
                        class="contact-information-icon"
                      ><i class="mdi mdi-information-outline"></i></v-btn>
                    </div>
                    <div>
                      <v-btn
                        type="submit"
                        icon
                        class="contact-send-icon"
                        :disabled="invalid"
                      ><i class="mdi mdi-send"></i></v-btn>
                    </div>
                  </div>
                  <div class="device-area">
                    <v-select
                      v-model="contact.device"
                      :items="devices"
                      label="DEVICE"
                      class="device-select"
                    ></v-select>
                  </div>
                  <!-- 問い合わせ内容 -->
                  <div class="contact-area">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="contentRequired|contentMax:300"
                      name="CONTACT"
                    >
                      <v-textarea
                        v-model="contact.content"
                        outlined
                        label="CONTACT"
                        class="contact-content"
                        :error-messages="errors"
                      ></v-textarea>
                    </ValidationProvider>
                  </div>
                </v-form>
              </ValidationObserver>
            </div>
            <!-- 問い合わせの説明ダイアログ領域 -->
            <v-tooltip
              v-model="show"
              bottom
              color="black"
              class="tooltip"
              style="border-radius: 7px;"
            >
              <span class="tooltip-area">
                Please enter your inquiry. <br>
                お問い合わせ内容を入力してください。 <br>
                I'm looking forward to the impression. <br>
                ご感想もお待ちしております。 <br>
                Only site administrators can see the content sent. <br>
                送信された内容はサイト管理者のみ確認が可能です。
              </span>
            </v-tooltip>

            <!-- 問い合わせを送信した場合お礼のダイアログ表示 -->
            <ThanksDialog ref="dlg" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import ThanksDialog from "~/components/ui/ThanksDialog.vue";

export default {
  data() {
    return {
      valid: false,
      contact: {
        device: "Phone",
        content: "",
      },
      show: false,
      devices: ["Phone", "Tablet", "PC"],
      rules: [
        value => !!value || 'CONTENT is Required',
        value => (value && value.length <= 300) || 'Max 300 characters',
      ],
    }
  },
  methods: {
    submit() {
      // 問い合わせコレクションへ登録
      db.collection('contacts').add({
        content: this.contact.content,
        device: this.contact.device
      });

      // 値のリセット
      this.contact.device = "Phone"
      this.contact.content = ""
      
      // お礼のダイアログを表示
      this.$refs.dlg.isDisplay = true
    }
  },
  components: {
    ThanksDialog
  }
}
</script>

<style scoped lang="scss">
.contact {
  height: 100%;
  background: linear-gradient(218deg,pink 50%,pink 50%,black 50%,black 50%) !important;
  .contact-child {
    height: 100%;
  }
}

.contact-card {
  margin: auto;
  width: 90%;
  height: 410px;
  border: solid 2px $base-text-color;
  background-color: $card-background-color;
  border-radius: 9px;

  .contact-icons {
    margin: 2% auto;
    width: 100%;
    display: flex;
    div {
      .contact-information-icon {
        color: $base-text-color;
        font-size: 35px !important;
        margin: 2px 0px 2px 11px;
      }
      .contact-send-icon {
        color: $base-text-color;
        font-size: 35px !important;
        margin: 2px 11px 2px 0px;
      }
    }
    div:last-child {
      margin: 0 0 0 auto;
    }
  }
}

// 使用端末
.device-area {
  margin: 5%;
}

// 問い合わせ内容
.contact-content {
  margin: 5%;
}

// ツールチップエリア
.tooltip-area {
  color: $base-text-color;
}
</style>
