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
    <!-- 問題、解答閲覧 -->
    <AllTests
      :tests="tests"
      :modeType="modeType"
      :maxSerialNumber="maxSerialNumber"
      :maxSerialNumberToType="maxSerialNumberToType"
    ></AllTests>
  </div>
</template>

<script>
import AllTests from "~/components/managements/AllTests.vue";
import TestCrud from "~/components/managements/TestCrud.vue";
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      tests: [],
      allTests: [],
      maxSerialNumber: [
        { serialNumber: 0, }
      ],
      maxSerialNumberToType: [
        { serialNumberToType: 0 }
      ],
      modeType: 0,
    }
  },
  firestore: {
    tests: db.collection("tests").where('modeType', '==', 0).orderBy('serialNumber', 'asc'),
    allTests: db.collection("tests").orderBy('modeType', 'asc').orderBy('serialNumber', 'asc'),
    maxSerialNumber: db.collection("tests").orderBy('serialNumber', 'desc').limit(1),
    maxSerialNumberToType: db.collection("tests").where('modeType', '==', 0).orderBy('serialNumberToType', 'desc').limit(1),
  },
  methods: {
    getTests(modeType) {
      // テストの種類別に取得
      if (modeType === this.$mode.music) {
        this.$bind('tests', db.collection("tests").where('modeType', '==', modeType));
      } else {
        this.$bind('tests', db.collection("tests").where('modeType', '==', modeType).orderBy('serialNumber', 'asc'));
        this.$bind('maxSerialNumberToType', db.collection("tests").where('modeType', '==', modeType).orderBy('serialNumberToType', 'desc').limit(1));
      }
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