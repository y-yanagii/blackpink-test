<template>
  <div class="text-center">
    <div class="TestTitleLogo">
      <span class="title-logo">
        {{ selectedMode.modeValue }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedMode: this.$store.getters['localStorages/choiceMode'],
    }
  },
}
</script>
