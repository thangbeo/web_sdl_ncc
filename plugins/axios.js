import APIs from '~/assets/configurations/API_Config'

// Axios interceptor. Auto log out when token is expired or invalid
export default function (context) {
  context.$axios.onResponse((response) => {
    const code = response.data.error.code
    const OK = APIs.responses.OK.code
    if (
      code === APIs.responses.TOKEN_EXPIRE.code ||
      code === APIs.responses.TOKEN_INVALID.code
    ) {
      context.app.$logout(context.app.router)
      context.store.dispatch('notification/set_notifications', {
        icon: 'error',
        timeout: 5000,
        color: 'white',
        text: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
      })

      context.app.router.app.$log.warn('Phiên đăng nhập hết hạn: ', {
        response,
      })
      return {
        error: true,
        data: response.data,
      }
    } else if (code === OK) {
      return {
        error: false,
        data: response.data,
      }
    } else {
      context.store.dispatch('notification/set_notifications', {
        icon: 'error',
        timeout: 5000,
        color: 'white',
        text: APIs.responses[code].message,
      })

      context.app.router.app.$log.warn('Có lỗi khi gọi API: ', {
        response,
      })
      return {
        error: true,
        data: response.data,
      }
    }
  })

  context.$axios.onError((error) => {
    context.app.router.app.$log.error('Có lỗi/exception: ', {
      error,
      response: error.response,
    })

    context.store.dispatch('notification/set_notifications', {
      icon: 'error',
      timeout: 5000,
      color: 'white',
      text: 'Có lỗi xảy ra khi kết nối đến server',
    })

    return {
      error: true,
    }
  })
}
