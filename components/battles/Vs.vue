<template>
  <div class="text-center battle-start">
    <div class="user user-1">
      <transition
        name="user"
        enter-active-class="animated slideInLeft"
        appear
      >
        <div :class="this.$vuetify.breakpoint.xs ? 'font-size-xs' : ''">{{userNames[0]}}</div>
      </transition>
    </div>
    <div class="vs" :class="this.$vuetify.breakpoint.xs ? 'font-size-xs-vs' : ''">VS</div>
    <div class="user user-2">
      <transition
        name="user"
        enter-active-class="animated slideInRight"
        appear
      >
        <div :class="this.$vuetify.breakpoint.xs ? 'font-size-xs' : ''">{{userNames[1]}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 3秒間表示
    setTimeout(() => {
      // 表示制御
      this.$emit('display-control');
    }, 3000)
  },
  props: ["userNames"],
}
</script>

<style scoped lang="scss">
.battle-start {
  margin: 100px 0px;
  width: 100%;
  .user {
    margin: 10% auto;
    text-align: center;
    width: 60%;
    max-width: 60%;
    border-bottom: solid 2px $base-text-color;
    div {
      font-size: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .font-size-xs {
      font-size: 17px !important;
    }
  }
  .vs {
    margin: 10%;
    font-style: italic;
    font-size: 30px;
    color: $base-text-color;
  }
  .font-size-xs-vs {
    font-size: 17px !important;
  }
}
</style>
