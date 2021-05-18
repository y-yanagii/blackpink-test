<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                TERMS OF USE
              </span>
            </div>
          </div>
        </div>

        <!-- 利用規約 -->
        <div class="text-center">
          <div class="terms-card">
            <Terms></Terms>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Terms from '~/components/ui/Terms.vue';

export default {
  components: {
    Terms
  },
}
</script>


<style scoped lang="scss">
.terms-card {
  margin: auto;
  padding: 2%;
  width: 90%;
  height: 100%;
  border: solid 2px $base-text-color;
  background-color: $card-background-color;
  border-radius: 9px;
}
</style>
