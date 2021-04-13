<template>
  <div class="text-center">
    <div class="TestTitleLogo">
      <span class="title-logo">
        {{ selectedMode }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedMode: this.$store.getters['mode/choiceMode'],
    }
  },
}
</script>
