<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <transition
          name="battleStart"
          leave-active-class="animated fadeOut"
          appear
        >
          <BattleStart
            v-if="isDisplayNum === $battleDisplayNum.battle"
            @display-control="displayControl"
            :isDisplayNum="isDisplayNum"
            :userNames="userNames"
          ></BattleStart>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BattleStart from '~/components/battles/BattleStart.vue';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
      userNames: ["柳澤_RUNTEQ17期生", "山田 太郎"]
    }
  },
  methods: {
    displayControl() {
      if (this.isDisplayNum === this.$battleDisplayNum.battle) {
        this.isDisplayNum = this.$battleDisplayNum.start;
      }
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