<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <div v-cloak>
          <transition
            name="displayControl"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
            appear
          >
            <Vs
              v-if="isDisplayNum === $battleDisplayNum.battle"
              @display-control="displayControl"
              :isDisplayNum="isDisplayNum"
              :userNames="userNames"
            ></Vs>
            <Start
              v-else-if="isDisplayNum === $battleDisplayNum.start"
              @display-control="displayControl"
            ></Start>
          </transition>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vs from '~/components/battles/Vs.vue';
import Start from '~/components/battles/Start.vue';

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
    Vs,
    Start,
  }
}
</script>

<style scoped lang="scss">

</style>