<template>
  <div>
    <div>
      {{ user }}
    </div>
    <div>
      {{ getUser }}
    </div>
  </div>
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
  computed: {
    getUser() {
      console.log("getUser");
    }
  },
  mounted() {
    let currentUser = this.$store.getters['twitter/user'];
    this.user.uid = currentUser.uid;
    this.user.name = currentUser.name;
    this.user.isLogin = currentUser.isLogin;
    this.user.photoURL = currentUser.uid;
    debugger
    this.user.privacy = this.$store.getters['statuses/getStatus', currentUser.uid]
  },
  created() {
    this.$store.dispatch('statuses/init');
  },
}
</script>

<style scoped lang="scss">

</style>
