<template>
  <div>{{ user }}</div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {}
    }
  },
  mounted() {
    this.user = this.$store.getters['twitter/user'];
    console.log("profile");
  }
}
</script>

<style scoped lang="scss">

</style>
