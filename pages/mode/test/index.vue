<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ModeTitle></ModeTitle>
        <Time></Time>
        <Card></Card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModeTitle from '~/components/ModeTitle.vue';
import Time from '~/components/Time.vue';
import Card from '~/components/Card.vue';

export default {
  data: function() {
    return {
    }
  },
  components: {
    ModeTitle,
    Time,
    Card
  }
}
</script>
