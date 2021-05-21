<template>
  <div>{{ user }}</div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        uid: "",
        name: "",
        isLogin: false,
        photoURL: "",
        privacy: false,
      }
    }
  },
  mounted() {
    let currentUser = this.$store.getters['twitter/user'];
    this.user.uid = currentUser.uid;
    this.user.name = currentUser.name;
    this.user.isLogin = currentUser.isLogin;
    this.user.photoURL = currentUser.uid;
    this.user.privacy = this.$store.getters['statuses/getStatus', currentUser.uid].privacy
  }
}
</script>

<style scoped lang="scss">

</style>
