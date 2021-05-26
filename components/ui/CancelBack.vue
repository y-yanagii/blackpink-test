<template>
  <div class="cancel-back-area">
    <v-btn
      @click="cancel()"
      class="cancel-back-btn"
    >
      C &nbsp;&nbsp;&nbsp; A &nbsp;&nbsp;&nbsp; N &nbsp;&nbsp;&nbsp; C &nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp; L
    </v-btn>
  </div>
</template>

<script>

export default {
  props: ["cancelVal"],
  methods: {
    cancel() {
      this.$router.push({ path: "/mode" });
    }
  }
}
</script>

<style scoped lang="scss">
.cancel-back-area {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 auto 20px auto;
  width: 100%;
  text-align: center;
  .cancel-back-btn {
    margin: auto;
    width: 65%;
    background: none;
    color: $base-text-color;
  }
}
</style>
