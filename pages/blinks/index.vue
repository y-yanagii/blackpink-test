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
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  created() {
    this.$store.dispatch('users/init');
  }
}
</script>

<style scoped lang="scss">

</style>
