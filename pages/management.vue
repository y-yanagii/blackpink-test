<template>
  <div>
    <div>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <div class="text-center">
            <v-btn
              v-for="mode in modeButtons"
              :key="mode.modeType"
              :class="mode.class"
              @click="getTests(mode.modeType)"
              outlined
            >
            {{ mode.modeText }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <TestCrud
      :allTests="allTests"
      :modeType="modeType"
    ></TestCrud>
    <AllTests
      :tests="tests"
      :modeType="modeType"
    ></AllTests>
  </div>
</template>

<script>
import AllTests from "~/components/pages/managements/AllTests.vue";
import TestCrud from "~/components/pages/managements/TestCrud.vue";
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      tests: [],
      allTests: [],
      modeType: 0,
    }
  },
  firestore: {
    tests: db.collection("tests").where('modeType', '==', 0),
    allTests: db.collection("tests").orderBy('modeType', 'asc')
  },
  methods: {
    getTests(modeType) {
      // テストの種類別に取得
      this.$bind('tests', db.collection("tests").where('modeType', '==', modeType));
      this.modeType = modeType;
    },
  },
  computed: {
    modeButtons() {
      return [
        { modeType: 0, class: "management-btn", modeText: "EASY" },
        { modeType: 1, class: "management-btn", modeText: "NORMAL" },
        { modeType: 2, class: "management-btn", modeText: "HARD" },
        { modeType: 3, class: "management-btn management-master-btn", modeText: "MASTER" },
        { modeType: 5, class: "management-btn management-music-btn", modeText: "MUSIC" },
      ]
    },
  },
  mounted() {
    this.$store.dispatch('tests/init');
  },
  components: {
    AllTests,
    TestCrud
  }
}
</script>

<style scoped lang="scss">
// 難易度選択ボタン共通
.management-btn {
  text-align: center;
  font-weight: bold;
  margin: 5% 3% 3% 0%;
  border: solid 2px $base-text-color;
  color: $base-text-color;
  span {
    font-size: 20px;
  }
}

.management-master-btn {
  border: solid 2px $master-color;
  color: $master-color;
}

.management-music-btn {
  border: solid 2px $music-color;
  color: $music-color;
}
</style>