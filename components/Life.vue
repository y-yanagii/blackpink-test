<template>
  <div class="text-left">
    <div class="life">
      <span
        v-for="(life, index) in lives"
        :key="index"
      >
        <v-icon>{{ life.icon }}</v-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lives"]
}
</script>

<style scoped lang="scss">
.life {
  color: $base-text-color;
  margin-left: 5%;
  padding-bottom: 1%;
  span {
    i {
      color: $base-text-color;
    }
  }
}
</style>