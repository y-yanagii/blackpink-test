<template>
  <div class="text-center">
    <div class="text-center">
      <div class="OtherLogo">
        <span class="title-logo">
          RANKING
        </span>
      </div>
    </div>
    <div class="text-center">
      <v-select
        v-model="modeSelect"
        :items="items"
        item-text="state"
        item-value="abbr"
        label="MODE"
        return-object
        outlined
        class="modeSelect"
        @input="changedRanking"
      ></v-select>
    </div>
    <!-- ランキング領域 -->
    <div class="text-center">
      <div>
        <v-simple-table
          dense
          fixed-header
          height="319px"
          :class="breakpointClass.rankingArea"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th :class="breakpointClass.header" class="text-left">RANK</th>
                <th :class="breakpointClass.header" class="text-left">NAME</th>
                <th :class="breakpointClass.header" class="text-left">SCORE</th>
                <th :class="breakpointClass.header" class="text-left">CLEAR TIME</th>
                <th :class="breakpointClass.header" class="text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              <!-- 1位 -->
              <tr
                v-for="(ranking, index) in get1stRankings"
                :key="index + 1"
              >
                <td :class="breakpointClass.header" class="text-left">
                  <i class="mdi mdi-crown-outline"></i>
                  {{ index + 1 }}
                </td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.name }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.score }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.clearTime | zeroPadAndFormat }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.createdAt.toDate() | dateFormat }}</td>
              </tr>
              <!-- 2位 -->
              <tr
                v-for="(ranking, index) in get2stRankings"
                :key="index + 2"
              >
                <td :class="breakpointClass.header" class="text-left">
                  <i class="mdi mdi-chess-king"></i>
                  {{ index + 2 }}
                </td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.name }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.score }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.clearTime | zeroPadAndFormat }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.createdAt.toDate() | dateFormat }}</td>
              </tr>
              <!-- 3位 -->
              <tr
                v-for="(ranking, index) in get3stRankings"
                :key="index + 3"
              >
                <td :class="breakpointClass.header" class="text-left">
                  <i class="mdi mdi-diamond-stone"></i>
                  {{ index + 3 }}
                </td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.name }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.score }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.clearTime | zeroPadAndFormat }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.createdAt.toDate() | dateFormat }}</td>
              </tr>
              <!-- 4位以下 -->
              <tr
                v-for="(ranking, index) in getOtherRankings"
                :key="index + 4"
              >
                <td :class="breakpointClass.header" class="text-left">{{ index + 4 }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.name }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.score }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.clearTime | zeroPadAndFormat }}</td>
                <td :class="breakpointClass.header" class="text-left">{{ ranking.createdAt.toDate() | dateFormat }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      modeSelect: { state: 'E A S Y', abbr: 0 },
      items: [
        { state: "E A S Y", abbr: 0 }, 
        { state: "N O R M A L", abbr: 1 },
        { state: "H A R D", abbr: 2 },
        { state: "M A S T E R", abbr: 3 },
        { state: "SUDDEN DEATH", abbr: 4 }
      ],
      breakpointClass: this.getBreakPoint()
    }
  },
  props: ["rankings"],
  methods: {
    changedRanking(value) {
      // valueにitemsのオブジェクトが入ってくる
      value.abbr
    },
    getBreakPoint() {
      // スマホ表示とそれ以外でテーブルのスタイルを切り分け
      if (this.$vuetify.breakpoint.xs) {
        return {
          rankingArea: "rankings-xs",
          header: "ranking-header",
          rankingValue: "ranking-value"
        }
      } else {
        return {
          rankingArea: "rankings",
          header: "ranking-header",
          rankingValue: "ranking-value"
        }
      }
    }
  },
  computed: {
    get1stRankings: function() {
      // 1位の取得
      const firstRank = this.rankings.filter(function(ranking, index) {
        // filterメソッドとコールバック関数で1位のみ取得
        return index === 0;
      })
      return firstRank
    },
    get2stRankings: function() {
      // 2位の取得
      const secondRank = this.rankings.filter(function(ranking, index) {
        // filterメソッドとコールバック関数で2位のみ取得
        return index === 1;
      })
      return secondRank
    },
    get3stRankings: function() {
      // 3位の取得
      const thirdRank = this.rankings.filter(function(ranking, index) {
        // filterメソッドとコールバック関数で3位のみ取得
        return index === 2;
      })
      return thirdRank
    },
    getOtherRankings: function() {
      // 1位、2位、3位以外のランキング
      const otherRanks = this.rankings.filter(function(ranking, index) {
        // filterメソッドとコールバック関数で3位以下取得
        return index !== 0 && index !== 1 && index !== 2;
      })
      return otherRanks
    }
  },
  filters: {
    // フォーマット整形
    zeroPadAndFormat: function(value) {
      // クリアタイムを０埋めし、mm:ss.fffに変換
      const clearTime = value.toString().padStart(7, "0");
      const mm = clearTime.slice(0, 2);
      const ss = clearTime.slice(2, 4);
      const fff = clearTime.slice(4, 7);
      return mm + ":" + ss + "." + fff;
    },
    dateFormat: function(value) {
      // yyyy/mm/ddの形に変換
      const date = value;
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }
  },
}
</script>

<style scoped lang="scss">
.rankings-xs {
  width: 100%;
  background-color: $base-bg-color;
  border: solid 2px $base-text-color;
}

.rankings {
  width: 100%;
  background-color: $base-bg-color;
  border: solid 2px $base-text-color;
}

// スマホ用ヘッダーとランキング情報
.ranking-header-xs {
  padding: 0% 1% !important;
  background-color: $base-bg-color !important;
  color: $base-text-color !important;
  border-bottom: solid 1px $base-text-color !important;
}

.ranking-value-xs {
  padding: 0% 1% !important;
  color: $base-text-color !important;
}

// スマホ以外のヘッダーとランキング情報
.ranking-header {
  padding: 0% 6px !important;
  background-color: $base-bg-color !important;
  color: $base-text-color !important;
  border-bottom: solid 1px $base-text-color !important;
}

.ranking-value {
  padding: 0% 6px !important;
  color: $base-text-color !important;
}
</style>
