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
        // VS画面を非表示とし、START画面に切り替え
        this.isDisplayNum = this.$battleDisplayNum.start;
      } else if (this.isDisplayNum === this.$battleDisplayNum.start) {
        // START画面を非表示とし、Question No.〇〇を表示
        this.isDisplayNum = this.$battleDisplayNum.questionNo;
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