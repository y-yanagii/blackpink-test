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
          height="300px"
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
              <tr
                v-for="(ranking, index) in rankings"
                :key="index"
              >
                <th :class="breakpointClass.header" class="text-left">{{ ranking }}</th>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name name namename namename name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
              </tr>
              <tr>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "100" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "name name" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "1000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "00:00:000" }}</td>
                <td :class="breakpointClass.rankingValue" class="text-left">{{ "2021/04/23" }}</td>
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
