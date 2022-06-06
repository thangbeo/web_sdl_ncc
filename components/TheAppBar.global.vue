<template>
  <v-app-bar v-bind="$attrs" class="my-5 mx-7 xt-app-bar">
    <slot></slot>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
.xt-app-bar {
  border-radius: $border-radius-root;
  &.theme--light {
    &.v-app-bar {
      &.v-toolbar {
        &.v-sheet {
          background: white;
        }
      }
    }
  }
}
</style>
