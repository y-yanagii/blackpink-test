<template>
  <NotFound v-if="error.statusCode === 404"></NotFound>
  <ServerError v-else-if="error.statusCode === 500"></ServerError>
</template>

<script>
import NotFound from '/pages/errors/404.vue';
import ServerError from '/pages/errors/500.vue';

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  components: {
    NotFound,
    ServerError
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
