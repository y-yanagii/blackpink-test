<template>
  <div class="text-center">
    <div class="text-center">
      <div class="OtherLogo">
        <span class="title-logo">
          RANKKNG
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
      ]
    }
  },
  props: ["rankings"],
  methods: {
    changedRanking(value) {
      // valueにitemsのオブジェクトが入ってくる
      value.abbr
    }
  },
}
</script>
