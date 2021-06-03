<template>
  <div class="rooms">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <div class="cloak-width" v-cloak>
          <transition
            :name="transitionName"
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
            <BattleTest
              v-else-if="isDisplayNum === $battleDisplayNum.test"
              :tests="setTests"
            ></BattleTest>
          </transition>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vs from '~/components/battles/Vs.vue';
import Start from '~/components/battles/Start.vue';
import BattleTest from '~/components/battles/BattleTest.vue';

export default {
  data() {
    return {
      tests: [],
      isDisplayNum: 0,
      userNames: [this.$store.getters['localStorages/getUserName'], "COM"],
      transitionName: "vs",
    }
  },
  methods: {
    displayControl() {
      if (this.isDisplayNum === this.$battleDisplayNum.battle) {
        // VS画面を非表示とし、START画面に切り替え
        this.isDisplayNum = this.$battleDisplayNum.start;
        this.transitionName = "start";
      } else if (this.isDisplayNum === this.$battleDisplayNum.start) {
        // Question No.画面を非表示とし、問題表示
        this.isDisplayNum = this.$battleDisplayNum.test;
        setTimeout(() => {
          this.transitionName = "test";
        }, 1000)
      }
    }
  },
  computed: {
    setTests() {
      let nums = [];
      // テストの総数を配列化
      for (let i=0;i<this.$testInfo.testLength;i++) {
        nums.push(i);
      }

      // ランダムでテスト番号を5件取得
      let serialNums = [];
      for (let j=0;j<5;j++) {
        serialNums.push(nums[Math.floor(Math.random() * nums.length)]);
      }

      // TODO消す
      serialNums = [1,2,3,4,5];
      this.tests = this.$store.getters["tests/getTestsAtRandom"](serialNums);

      // 選択値をランダムに
      this.tests.map(function(test) {
        // 選択値をシャッフル
        for (let i = (test.options.length - 1); 0 < i; i--) {
          // ランダムで要素数1つを取得
          let r = Math.floor(Math.random() * (i + 1));
          // 並び替え
          let tmp = test.options[i];
          test.options[i] = test.options[r];
          test.options[r] = tmp;
        }
      });
      return this.tests;
    }
  },
  created() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
  },
  validate(context) {
    if (context.params.id) return true;

    return false;
  },
  components: {
    Vs,
    Start,
    BattleTest,
  }
}
</script>

<style scoped lang="scss">
.rooms {
  height: 100%;
  background: linear-gradient(284deg,pink 50%,pink 50%,black 50%,black 50%) !important;
}

.cloak-width {
  margin: auto;
  max-width: 550px;
}

// vs画面アニメーション
.vs-enter-active, .vs-leave-active{
  transition: opacity 2s
}
.vs-enter, .vs-leave-to{
  opacity: 0;
}

// START!画面アニメーション
.start-enter-active {
  transition: opacity 1s
}
.start-enter, .start-leave-to{
  opacity: 0;
}

// Questionナンバー画面アニメーション
.question-enter-active, .question-leave-active{
  -webkit-transform: scale(0.5);
  transform: scale(1);
  -webkit-transition: .3s ease-in;
  transition: .3s ease-in;
}
.question-enter, .question-leave-to{
  opacity: 0;
}
</style>
