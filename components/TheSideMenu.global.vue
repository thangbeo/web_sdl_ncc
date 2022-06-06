<template>
  <v-navigation-drawer v-bind="$attrs" class="elevation-2 xt-nav-bar">
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-content>
          <logo-svg></logo-svg>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <template v-for="(item, index) in menuList">
        <v-list-group
          v-if="!$isNullOrEmpty(item.children)"
          :key="index"
          no-action
          link
          active-class="blue  lighten-5 blue--text"
          class="xt-nav-group-hover"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <template v-for="(child, i) in item.children">
            <v-list-group
              v-if="!$isNullOrEmpty(child.children)"
              :key="i"
              no-action
              sub-group
              link
              active-class="blue lighten-4 blue--text text--darken-3 "
              class="xt-nav-group-hover"
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon v-text="child.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(child1, i1) in child.children"
                :key="i1"
                :to="child1.url"
                router
                active-class="primary elevation-8 white--text"
                class="xt-nav-item-hover pl-10 mb-1"
              >
                <v-list-item-icon>
                  <v-icon v-text="child1.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  class="pt-1"
                  v-text="child1.title"
                ></v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="i"
              :to="child.url"
              router
              active-class="primary elevation-8 white--text"
              class="xt-nav-item-hover pl-6 mb-1"
            >
              <v-list-item-icon>
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list-group>
        <v-list-item
          v-else
          :key="index"
          :to="item.url"
          router
          active-class="primary elevation-8 white--text"
          class="xt-nav-item-hover mb-1"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss">
.xt-nav-bar {
  .v-list-group__items {
    overflow: visible;
  }
  .v-list-group__header__prepend-icon {
    order: 1;
    .mdi-menu-down {
      &::before {
        content: '\F0140';
      }
    }
  }
  .v-list-item {
    .v-list-item__icon {
      transition: all 0.2s ease-in-out;
    }

    .v-list-item__title {
      transition: all 0.4s ease-in-out;
    }
    &:hover {
      .v-list-item__icon {
        transform: translateX(10px) !important;
      }

      .v-list-item__title {
        transform: translateX(10px) !important;
      }
    }
  }
}
</style>
