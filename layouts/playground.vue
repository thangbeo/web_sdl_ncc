<template>
  <v-app>
    <the-side-menu
      v-model="sideMenu"
      :menu-list="menuList"
      app
      :expand-on-hover="expandOnHover"
      width="260px"
    ></the-side-menu>
    <the-app-bar :clipped-left="false" fixed app elevation="2">
      <v-app-bar-nav-icon @click.stop="sideMenu = !sideMenu" />
      <v-toolbar-title class="align-center d-flex">
        <img src="/logo/logo.png" width="180" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon color="primary" size="40">mdi-account-circle</v-icon>
      </v-btn>
    </the-app-bar>
    <v-content class="mx-4" style="padding-top: 92px">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideMenu: true,
      expandOnHover: false,
      menuList: [
        {
          title: 'Home',
          url: '/playground',
          icon: 'mdi-home',
          children: [],
        },
        {
          title: 'System',
          url: '/system',
          icon: 'mdi-home',
          children: [
            {
              title: 'System 1',
              url: '/playground',
              icon: 'mdi-home',
            },
          ],
        },
        {
          title: 'System',
          url: '/system',
          icon: 'mdi-home',
          children: [
            {
              title: 'System 1',
              url: '/system',
              icon: 'mdi-home',
              children: [
                {
                  title: 'System 2',
                  url: '/playground',
                  icon: 'mdi-home',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.theme--light {
  &.v-application {
    background: #f5f5f5;
  }
}
</style>
