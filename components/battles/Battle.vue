<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <ProgressLinear v-if="isDisplayNum === 0"></ProgressLinear>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProgressLinear from '~/components/ui/ProgressLinear.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
    }
  },
  components: {
    ProgressLinear,
  }
}
</script>

<style scoped lang="scss">

</style>