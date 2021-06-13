<!-- 難易度選択領域 -->
<template>
  <Start
    v-if="!show"
    @change-show="changeShow"
  ></Start>
  <Battle
    v-else-if="show && playType === $modeNumber.battle"
  ></Battle>
  <Test
    v-else-if="show && playType === $modeNumber.test"
    :tests="tests"
  ></Test>
  <Challenge
    v-else-if="show && playType === $modeNumber.challenge"
    :tests="tests"
  ></Challenge>
  <Game
    v-else-if="show && playType === $modeNumber.game"
  ></Game>
</template>

<script>
import Start from '~/components/ui/Start.vue';
import Test from '~/components/tests/Test.vue';
import Game from '~/components/games/Game.vue';
import Challenge from '~/components/challenges/Challenge.vue';
import Battle from '~/components/battles/Battle.vue';

export default {
  data: function() {
    return {
      // 初期表示はスタート画面のコンポーネント
      show: false,
      playType: this.$store.getters['localStorages/getPlayType'],
      tests: [],
    }
  },
  methods: {
    changeShow(value) {
      if (this.playType === this.$modeNumber.test || this.playType === this.$modeNumber.challenge) {
        // 大項目がテスト、またはチャレンジの場合、テスト取得処理
        let modeType = this.$store.getters['localStorages/choiceMode'].modeType;

        if (modeType !== this.$mode.suddendeath) {
          // モード種別ごと配列を取得
          let testToModeArray = this.getModeArray(modeType); // 種別ごとのテスト総数を配列で保持
          // ランダムでテスト番号を10件取得
          let randomSerialNums = [];
          for (let i=0;i<10;i++) {
            let randomNum = testToModeArray[Math.floor(Math.random() * testToModeArray.length)];
            randomSerialNums.push(randomNum);
            testToModeArray = testToModeArray.filter(t => t !== randomNum); // 1度抽出した数字を除外
          }
          // テスト取得
          this.tests = this.$store.getters['tests/getTestsAtRandomToMode']({ serialNumberToTypes: randomSerialNums, modeType: modeType });

        } else {
          // suuden deathモードの場合music以外のテストを全件取得
          this.tests = this.$store.getters['tests/gettestsToSuddenDeath'];
        }
        this.processingTests();
      }
      // テストかゲーム画面に切り替え
      this.show = true
    },
    processingTests() {
      // 取得したテストコレクションをシャッフルかつ10件にする
      // 問題をシャッフル
      for (let i = (this.tests.length - 1); 0 < i; i--) {
        // ランダムで要素数1つを取得
        let r = Math.floor(Math.random() * (i + 1));

        // 並び替え
        let tmp = this.tests[i];
        this.tests[i] = this.tests[r];
        this.tests[r] = tmp
      }

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

      // サドンデスの場合はシャッフルのみ
      if (this.$store.getters['localStorages/choiceMode'].modeType === this.$mode.suddendeath) return
    },
    getModeArray(modeType) {
      if (modeType === this.$mode.easy) {
        return this.$testInfo.easyArray;
      } else if (modeType === this.$mode.normal) {
        return this.$testInfo.normalArray;
      } else if (modeType === this.$mode.hard) {
        return this.$testInfo.hardArray;
      } else if (modeType === this.$mode.music) {
        return this.$testInfo.musicArray;
      } else if (modeType === this.$mode.master) {
        return this.$testInfo.masterArray;
      }
    }
  },
  created() {
    // testsコレクションの初期化
    this.$store.dispatch('tests/init');
  },
  validate(context) {
    // urlチェック
    const modePath = ["easy", "normal", "hard", "master", "suddendeath", "music", "bubble", "puzzle", "1on1"]
    if (modePath.includes(context.params.mode)) return true
    
    // エラーページ（404）
    return false
  },
  components: {
    Start,
    Test,
    Game,
    Challenge,
    Battle,
  },
  async asyncData(context) {
    // ituensAPIで楽曲情報取得処理
    // 詳細はnuxt.config.jsのproxyを参照
    // const url = "/search";
    // const response = await context.$axios.$get(url, {
    //   params: {
    //     term: "blackpink",
    //     entity: "musicTrack"
    //   }
    // });

    // 他のアーティストも取れてきてしまうため一旦はK-Popで絞る
    // return { results: response.results.filter(n => n.primaryGenreName === "K-Pop") }
  },
}
</script>
