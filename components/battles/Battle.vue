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
import { db } from '~/plugins/firebase.js';

export default {
  data: function() {
    return {
      isDisplayNum: 0,
      cancelVal: this.$mode.oneonone,
      unsubscribe: null,
    }
  },
  mounted() {
    const twitterId = this.$store.getters['localStorages/getTwitterId'];
    // ユーザ待ち状態に登録(画面遷移時監視を止めるため関数実行させる)
    // this.$store.dispatch('waitings/set', twitterId);
    // スナップショットでwaitingsの自身のレコードを監視
    this.unsubscribe = db.collection('waitings').doc(twitterId).onSnapshot(snapshot => {
      debugger
      // waitingsにroomIdが入ってくるので、マッチング成功。部屋移動
      console.log(snapshot.data());
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  components: {
    ProgressLinear,
    CancelBack,
  }
}
</script>

<style scoped lang="scss">
</style>