<template>
  <NotFound v-if="error.statusCode === 404"></NotFound>
  <v-app v-else dark>
    <h1>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
import NotFound from '/pages/errors/404.vue';

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  components: {
    NotFound
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
