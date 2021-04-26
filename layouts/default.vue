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
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-menu
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
          </v-btn>
      </v-speed-dial>

      <!-- <v-spacer /> -->
      <!-- ハンバーガーアイコン -->
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <!-- ボディ領域の呼び出し元 -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- ナビゲーション領域 -->
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- フッター -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span class="copyright">&copy; {{ new Date().getFullYear() + ' ' + title }}</span>
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
          icon: 'mdi-yin-yang',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-crown-outline',
          title: 'RANKING',
          to: '/ranking'
        },
        {
          icon: 'mdi-play-box',
          title: 'MODE',
          to: '/mode'
        },
        {
          icon: 'mdi-email-edit-outline',
          title: 'CONTACT',
          to: '/contact'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BLAↃKPINK TEST',
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

.default-header {
  background-color: $base-glay !important;
}

.navbar-title {
  color: $base-text-color;
}

.copyright {
  opacity: 0.4;
}
</style>