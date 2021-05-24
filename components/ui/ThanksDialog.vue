<template>
  <v-dialog
    v-model="isDisplay"
    max-width="550px"
  >
    <v-card class="thank-card">
      <div class="thank-you-blink text-center">
        🖤💖👑THANKS TO BLINK👑🖤💖
      </div>
      <div class="thank-you-image-area">
        <!-- <img :src="imageSrc" class="blackpink-image"> -->
        <iframe
          src="https://giphy.com/embed/F9fDwm72StUsWeVMgc"
          frameBorder="0"
          class="giphy-embed blackpink-image"
          allowFullScreen
        ></iframe>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          class="close-btn"
          @click="isDisplay = !isDisplay"
        >
          <v-icon>mdi-close</v-icon> CLOSE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isDisplay: true,
      imageSrc: require("~/assets/images/thanks.jpeg")
    }
  }
}
</script>

<style scoped lang="scss">
.thank-card {
  background-color: $base-bg-color;
  height: 100%;
  border: solid 2px $base-text-color;
  border-radius: 7px !important;
  .thank-you-blink {
    font-size: 19px;
    padding: 3%;
    margin: auto;
    color: $base-text-color;
  }
  .thank-you-image-area {
    text-align: center;
    .blackpink-image {
      padding: 4%;
      width: 95%;
      height: 95%;
      border-radius: 5%;
      border-style: none;
    }
  }
}
.close-btn {
  color: $base-text-color;
  background-color: $base-bg-color !important;
}
</style>