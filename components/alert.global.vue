<template>
  <div class="position-absolute-top-right notification pa-2">
    <v-slide-y-transition group>
      <div
        v-for="(notification, idx) in $store.state.notification.notifications"
        :key="`notification-${idx}`"
        class="notification-item"
        @click="dismiss_alert(notification)"
      >
        <v-alert
          height="40"
          elevation="4"
          :color="notification.color"
          class="black--text pa-1 px-4 align-center d-flex"
        >
          <div class="subtitle-1 d-flex mt-2">
            <div v-if="notification.icon === 'success'" class="mr-2">
              <success-icon></success-icon>
            </div>
            <div v-if="notification.icon === 'error'" class="mr-2">
              <error-icon></error-icon>
            </div>
            {{ notification.text }}
          </div>
        </v-alert>
      </div>
    </v-slide-y-transition>
  </div>
</template>
<script>
export default {
  methods: {
    dismiss_alert(notification) {
      this.$store.commit('notification/remove_notification', notification)
    },
  },
}
</script>
<style lang="scss">
.notification {
  z-index: 6;
  overflow-y: hidden !important;
  overflow-x: visible !important;
  max-height: 100% !important;

  .notification-item {
    cursor: pointer;
  }
}
</style>
