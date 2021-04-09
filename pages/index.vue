<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- タイトルロゴ -->
      <div class="text-center">
        <logo />
      </div>
      <!-- 初期登録領域 -->
      <div class="text-center">
        <div>
          <v-text-field
            class="username-text"
            label="USERNANE"
            :rules="rules"
            hide-details="auto"
            color="#f4a6b8"
            
            maxlength="50"
          ></v-text-field>
          <v-btn
            elevation="2"
            icon
            color="#f4a6b8"
          ><i class="mdi mdi-twitter"/></v-btn>
        </div>
        <br>
        <v-btn
          outlined
          class="area-button"
          @click="userNameCheck"
        >PLAY</v-btn>
        <br><br>
        <span class="base-text-color">or</span>
        <br><br>
        <router-link
          to="/mode"
          active-class="link--active"
          exact
          class="link"
        >GUEST PLAY</router-link>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data: function() {
    return {
      rules: [
        //value => !!value || 'Required.',
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ]
    }
  },
  methods: {
    userNameCheck() {
      
    }
  },
  components: {
    Logo,
  }
}
</script>

<style scoped lang="scss">
.username-text {
  display: inline-block;
  margin: auto;
  width: 53%;
}

.base-text-color {
  display: inline-block;
  margin: auto;
  width: 60%;
  color: $base-text-color;
}

.link {
  font-weight: bold;
  color: $base-text-color;
  width: 60%;
}

</style>