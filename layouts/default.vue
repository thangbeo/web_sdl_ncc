<template>
  <v-app>
    <client-only>
      <alert group="main" :duration="7000" position="top right" :max="5" />
    </client-only>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      color="#F1F2F6"
      fixed
      width="300px"
      app
      light
      style="padding-bottom: 54px"
      class="denser-nav"
    >
      <v-list nav dense expand class="disabled-active">
        <!--        <NavigateLayout></NavigateLayout>-->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      flat
      :clipped-left="clipped"
      fixed
      app
      light
      class="border-bot-mbf"
      height="60"
      color="primary"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <nuxt-link to="/">
        <v-toolbar-title class="align-center d-flex">
          <div class="pt-1">
            <logoS />
          </div>
          <!--          v-if="$store.state.app.pageTitle === 'Dashboard'"-->
          <!--          <div v-else class="pt-1">-->
          <!--            <logoFile/>-->
          <!--          </div>-->
          <div class="headline pl-3 font-weight-bold white--text">Tagline</div>
        </v-toolbar-title>
      </nuxt-link>
      <div
        v-if="title === 'cms'"
        class="title font-weight-bold white--text"
        style="margin-left: 68px"
      >
        <!--        Dashboad-->
        {{ $store.state.app.pageTitle }}
      </div>

      <v-spacer></v-spacer>

      <v-btn x-small icon dark class="mr-3">
        <v-icon>mdi-bell</v-icon>
        <v-icon
          style="position: absolute; bottom: 6px; left: 6px"
          size="9"
          color="pink accent-2"
        >
          mdi-checkbox-blank-circle
        </v-icon>
      </v-btn>
      <v-avatar :tile="false" class="profile" color="grey" size="28">
        <v-icon color="white" size="35">mdi-account-circle</v-icon>
      </v-avatar>
      <div class="ml-3 font-weight-bold white--text">
        Admin
        {{ username }}
      </div>
      <div>
        <v-menu v-model="menu" transition="scroll-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn x-small icon dark class="ma-2" v-on="on">
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list dense width="150" class="py-0">
            <v-list-item-group v-model="action">
              <nuxt-link class="nuxt-link" to="/">
                <v-list-item class="pl-2">
                  <v-list-item-icon class="mr-0">
                    <v-icon size="16">mdi-lock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Tài khoản của tôi</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </nuxt-link>
              <v-divider></v-divider>
              <v-list-item class="pl-2" @click="log_out">
                <v-list-item-icon class="mr-0">
                  <v-icon color="#FF296B" size="16">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="nuxt-link"
                    >Đăng xuất</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import logoS from '../components/iconPage/logoS'
// import logoFile from '../components/iconPage/logoFile'

import '../assets/table.scss'

export default {
  middleware: 'auth',
  components: {
    // NavigateLayout,
    logoS,
    // logoFile,
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      expand: false,
      title: null,
      menu: false,
      miniVariant: false,
      username: '',
      action: null,
    }
  },
  computed: {
    // topmenu() {
    // return this.getMenuByParent(0)
    // }
  },
  watch: {
    menu(value) {
      if (!value) {
        this.action = null
      }
    },
  },

  created() {
    // this.$vuetify.theme.dark = false
  },
  mounted() {
    // this.title = this.$root.context.app.head.title
    // if (!this.$isServer) {
    //   if (!this.$store.state.app.getRoles) {
    //     this.$store.dispatch('app/GetRole')
    //   }
    //   this.$store.dispatch('app/config_info')
    //     .then(res => {
    //       if (!res.error) {
    //         // this.$log.debug(res, ' :res')
    //         this.$store.commit('app/set_page_size', Number(res.data.data.page_size))
    //         this.$store.commit('app/set_time_alert', Number(res.data.data.display_alert_time))
    //       }
    //     })
    //   this.username = Cookies.get('username')
    // }
  },
  methods: {
    log_out() {
      this.$logout(this.$router)
    },
  },
}
</script>

<style lang="scss">
.nuxt-link {
  text-decoration: none;
  color: #ff296b !important;
}

.v-list-item__icon {
  margin-right: 20px !important;
}

.v-application--is-ltr
  .v-list--dense.v-list--nav
  .custom-group.v-list-group--no-action
  > .v-list-group__items
  > div
  > .v-list-item {
  padding-left: 50px !important;
}

.v-application--is-ltr
  .v-list--dense
  .v-list-group--sub-group
  .v-list-group__header {
  padding-left: 6px;
}

// .border-bot-mbf .v-toolbar__content {
//   border-bottom: solid 5px #0063af;
// }

.v-list-item--active {
  background-color: white;
}
</style>
