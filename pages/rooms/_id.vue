<template>
  <div>
    aaaa
  </div>
</template>

<script>
export default {
  data: function() {
    return {

    }
  },
  validate(context) {
    if (context.params.id) return true;
    return false;
  }
}
</script>

<style scoped lang="scss">

</style>