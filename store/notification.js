const state = () => ({
  notifications: [],
})
const mutations = {
  set_notifications(state, payload) {
    const notifications = [...state.notifications]
    notifications.unshift(payload)
    state.notifications = [...notifications]
  },
  remove_notification(state, payload) {
    const notifications = [...state.notifications]
    const idx = notifications.indexOf(payload)
    if (idx >= 0) {
      notifications.splice(idx, 1)
      state.notifications = [...notifications]
    }
  },
}

const actions = {
  set_notifications(vueContext, payload) {
    vueContext.commit('set_notifications', payload)
    setTimeout(() => {
      vueContext.commit('remove_notification', payload)
    }, vueContext.rootState.app.alert_display_time)
  },
}

export default {
  state,
  mutations,
  actions,
}
