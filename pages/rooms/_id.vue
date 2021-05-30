<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        
      </v-col>
    </v-row>
    <BattleStart
      v-if="isDisplayNum === $battleDisplayNum.battle"
      :isDisplayNum="isDisplayNum"
    ></BattleStart>
  </div>
</template>

<script>
import BattleStart from '~/components/battles/BattleStart.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
    }
  },
  validate(context) {
    if (context.params.id) return true;

    return false;
  },
  components: {
    BattleStart
  }
}
</script>

<style scoped lang="scss">

</style>