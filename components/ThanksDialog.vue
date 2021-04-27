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
        <img :src="imageSrc" class="blackpink-image">
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isDisplay: false,
      imageSrc: require("~/assets/images/thanks.jpeg")
    }
  }
}
</script>

<style scoped lang="scss">
.thank-card {
  background-color: $base-text-color;
  height: 100%;
  border: solid 2px $base-text-color;
  border-radius: 7px !important;
  .thank-you-blink {
    font-size: 19px;
    padding: 3%;
    margin: auto;
    color: $text-color-black;
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
</style>