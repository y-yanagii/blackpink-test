<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <ProgressLinear v-if="isDisplayNum === 0"></ProgressLinear>
        <CancelBack
          v-if="isDisplayNum === 0"
          :cancelVal="cancelVal"
        ></CancelBack>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProgressLinear from '~/components/ui/ProgressLinear.vue';
import CancelBack from '~/components/ui/CancelBack.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
      cancelVal: this.$mode.oneonone,
    }
  },
  components: {
    ProgressLinear,
    CancelBack,
  }
}
</script>

<style scoped lang="scss">
</style>