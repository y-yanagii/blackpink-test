<template>
  <div class="error-area">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <div class="OtherLogo">
            <span class="title-logo error-title">
              404 NOT FOUND
            </span>
          </div>
        </div>
        <div class="text-center">
          <div>
            <v-btn
              to="/"
              class="to-top-btn"
              outlined
            >
              <v-icon>mdi-undo-variant</v-icon>
              TOP
            </v-btn>
          </div>
          <div class="sorry">
            SORRY...
          </div>
          <div class="error-">
            <iframe src="https://giphy.com/embed/hsuv18M8ZxmoNkqmQO" width="100%" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/BLACKPINK-blackpink-the-show-hsuv18M8ZxmoNkqmQO">via GIPHY</a></p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.error-area {
  background-color: $base-bg-pink;
  height: 100%;
}

.error-title {
  color: $text-color-black !important;
}

.sorry {
  color: $text-color-black !important;
}

.to-top-btn {
  border: solid 2px $text-color-black;
  color: $text-color-black !important;
  margin-bottom: 5%;
}
</style>