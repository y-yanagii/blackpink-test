<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="default-header"
    >
      <v-toolbar-title v-text="title" @click="root()" class="navbar-title" />

      <v-spacer />
      <!-- FAB -->
      <v-speed-dial
        v-model="fab"
        :direction="direction"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="#272727"
            fab
          >
            <v-icon v-if="fab" color="#f4a6b8">
              mdi-close
            </v-icon>
            <v-icon v-else color="#f4a6b8">
              mdi-yin-yang
            </v-icon>
          </v-btn>
        </template>
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            fab
            dark
            small
            color="#f4a6b8"
            class="fab-icon"
          >
            <v-icon>{{ item.icon }}</v-icon>
            <div>
              <span class="fab-span" :style="item.left">{{ item.title }}</span>
            </div>
          </v-btn>
      </v-speed-dial>
    </v-app-bar>

    <!-- ボディ領域の呼び出し元 -->
    <v-main>
      <v-container style="height: 100%;">
        <nuxt />
      </v-container>
    </v-main>

    <!-- フッター -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span class="copyright">&copy; {{ new Date().getFullYear() + ' ' + title }}</span>

      <div class="fotter-btns">
        <div
          v-for="(item, index) in footerItems"
          :key="index"
        >
          <v-btn
            :to="item.to"
            fab
            dark
            small
            class="fab-icon"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-gamepad-variant-outline',
          title: 'MODE',
          to: '/mode',
          left: 'left: -38px;',
        },
        {
          icon: 'mdi-account-outline',
          title: 'PROFILE',
          to: '/profile',
          left: 'left: -54px;',
        },
        {
          icon: 'mdi-account-group',
          title: 'BLINKS',
          to: '/blinks',
          left: 'left: -48px;',
        },
        {
          icon: 'mdi-crown-outline',
          title: 'RANKING',
          to: '/ranking',
          left: 'left: -59px;',
        },
        {
          icon: 'mdi-bell-outline',
          title: 'NOTICES',
          to: '/notice',
          left: 'left: -57px;',
        }
      ],
      footerItems: [
        {
          icon: 'mdi-email-edit-outline',
          title: 'CONTACT',
          to: '/contact',
          left: 'left: -61px;',
        },
        {
          icon: 'mdi-note-outline',
          title: 'TERMS',
          to: '/terms',
          left: 'left: -45px;',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BLINK GAMES',
      direction: 'bottom',
      fab: false,
      transition: 'scale-transition',
    }
  },
  methods: {
    root() {
      // ヘッダタイトル押下時rootに遷移
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="scss">
.fab-icon {
  color: $base-bg-color;
}

.fab-span {
  position: absolute;
  margin: 40% 2% 2% 2%;
  padding: 4%;
  background-color: $base-glay;
  color: $base-text-color;
  float: right;
}

.default-header {
  background-color: $base-glay !important;
}

.navbar-title {
  cursor: pointer;
  color: $base-text-color;
}

.copyright {
  opacity: 0.4;
}

.fotter-btns {
  margin: auto 0 auto auto;
  display: flex;
  div {
    margin-right: 10px;
    a {
      color: $base-text-color;
    }
  }
  div:nth-of-type(2) {
    margin-right: 1px;
  }
}
</style>