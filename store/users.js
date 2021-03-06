import Cookies from 'js-cookie'
import moment from 'moment'
import APIs from '~/assets/configurations/API_Config'

const state = () => ({
  groups: [],
  schedules: [],
  items: [],
  detailUser: {
    user_name: '',
    full_name: '',
    phone_number: '',
    mobile_number: '',
    address: '',
    email: '',
    sex: 0,
    unit: '',
  },
  addressIpOfUser: [],
  groupUser: [],
  selectedIndex: -1,
  selectedItem: {
    user_id: 0,
    user_name: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    address: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    sex: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    password: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    email: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    full_name: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    phone_number: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    mobile_number: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    unit: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    status: 1,
    birthday: {
      value: '',
      invalid: false,
      invalidMsg: '',
    },
    list_group: {
      value: [],
      invalid: false,
      invalidMsg: '',
    },
    ip: {
      value: [],
      invalid: false,
      invalidMsg: '',
    },
    schedule_id: {
      value: 0,
      invalid: false,
      invalidMsg: '',
    },
  },
  pageIndex: 1,
  pageSize: 50,
})

const getters = {}

const mutations = {
  // -------------BASIC MUTIONS-----------------------------------------------------
  unsetItem() {},
  // set new value for a property in object
  changeStateValue(state, payload) {
    state[payload.field] = payload.value
  },
  changeComplexStateSeletedValue(state, payload) {
    state.selectedItem[payload.field] = {
      ...state.selectedItem[payload.field],
      value: payload.value,
      invalid: false,
      invalidMsg: '',
    }
  },
  updatePagingIndex(state, payload) {
    state.pageIndex = payload.pageIndex
    state.pageSize = payload.pageSize
  },
  changeSimpleStateSeletedValue(state, payload) {
    state.selectedItem[payload.field] = payload.value
    if (payload.inItem !== undefined)
      state.items[state.selectedIndex][payload.field] = payload.value
  },
  undoChangeStatus(state) {
    const newStatus = state.selectedItem.status === 0 ? 1 : 0
    state.selectedItem.status = newStatus
    state.items[state.selectedIndex].status = newStatus
  },
  // set items by array object
  setListItems(state, payload) {
    state.items = payload
  },

  setDetailUser(state, payload) {
    // lay thong tin user
    state.detailUser = payload.account_info
    state.groupUser = []
    state.addressIpOfUser = []
    // lay thong tin nhom cua user
    if (payload.group_infos.length !== 0) {
      payload.group_infos.map((option, index) => {
        state.groupUser.push(option.group_name)
      })
    }
    // lay thong tin dia chi ip cua user
    if (payload.user_ip_infos.length !== 0) {
      payload.user_ip_infos.map((option, index) => {
        state.addressIpOfUser.push(option.ip_address)
      })
    }
  },

  // action to set selectedItem by itemdb
  setSelectedItem(state, itemDb) {
    // console.log(itemDb,'setSelectedItem');
    state.selectedItem.user_id = itemDb.user_id
    state.selectedItem.user_name.value = itemDb.user_name
    state.selectedItem.password.value = itemDb.password
    state.selectedItem.full_name.value = itemDb.full_name
    state.selectedItem.email.value = itemDb.email
    state.selectedItem.phone_number.value = itemDb.phone_number
    state.selectedItem.mobile_number.value = itemDb.mobile_number
    state.selectedItem.unit.value = itemDb.unit
    state.selectedItem.sex.value = itemDb.sex
    state.selectedItem.address.value = itemDb.address
    state.selectedItem.status = itemDb.status
    state.selectedItem.birthday.value = this.$formatDateVNToISO(itemDb.birthday)
    state.selectedItem.schedule_id.value = itemDb.schedule_id
    const obj = state.items.find((p) => p.user_id === itemDb.user_id)
    if (obj) state.selectedIndex = state.items.indexOf(obj)
    state.selectedItem.list_group.value = []
    state.selectedItem.ip.value = []
  },

  // create new item - reset all property of item
  setNewItem(state) {
    state.selectedItem.user_id = 0
    state.selectedItem.user_name.value = ''
    state.selectedItem.password.value = ''
    state.selectedItem.full_name.value = ''
    state.selectedItem.email.value = ''
    state.selectedItem.phone_number.value = ''
    state.selectedItem.mobile_number.value = ''
    state.selectedItem.unit.value = ''
    state.selectedItem.sex.value = 0
    state.selectedItem.address.value = ''
    state.selectedItem.status = 1
    state.selectedItem.schedule_id.value = 0
    state.selectedItem.birthday.value = ''
    state.selectedItem.list_group.value = []
    state.selectedItem.ip.value = []
    state.selectedIndex = -1
  },
  resetValid(state) {
    state.selectedItem.full_name.invalid = false
    state.selectedItem.full_name.invalidMsg = ''
    state.selectedItem.email.invalid = false
    state.selectedItem.email.invalidMsg = ''
    state.selectedItem.user_name.invalid = false
    state.selectedItem.user_name.invalidMsg = ''
    state.selectedItem.password.invalid = false
    state.selectedItem.password.invalidMsg = ''
    state.selectedItem.address.invalid = false
    state.selectedItem.address.invalidMsg = ''
    state.selectedItem.list_group.invalid = false
    state.selectedItem.list_group.invalidMsg = ''
    state.selectedItem.ip.invalid = false
    state.selectedItem.ip.invalidMsg = ''
    state.selectedItem.unit.invalid = false
    state.selectedItem.unit.invalidMsg = ''
    state.selectedItem.sex.invalid = false
    state.selectedItem.sex.invalidMsg = ''
    state.selectedItem.mobile_number.invalid = false
    state.selectedItem.mobile_number.invalidMsg = ''
    state.selectedItem.phone_number.invalid = false
    state.selectedItem.phone_number.invalidMsg = ''
    state.selectedItem.schedule_id.invalid = false
    state.selectedItem.schedule_id.invalidMsg = ''
    state.selectedItem.birthday.invalid = false
    state.selectedItem.birthday.invalidMsg = ''
  },
  // add new item into items
  // this method does need
  addNewItem(state, payload) {
    // update GUI
    state.items.unshift(payload)
  },
  updateItem(state, payload) {
    const saveItem = payload
    Object.assign(state.items[state.selectedIndex], saveItem)
  },
  deleteItem(state) {
    state.items.splice(state.selectedIndex, 1)
  },

  // open or close dialog user infor
  setInvalid(state, payload) {
    state.selectedItem[payload.field] = {
      ...state.selectedItem[payload.field],
      invalid: true,
      invalidMsg: payload.message,
    }
  },
  // ------------------EXTEND MUTIONS------------------------------------
  // new actions method
  setAfterChangeStatus(state, payload) {
    state.items.find((u) => u.user_id === payload.user_id).status =
      payload.status
  },

  setGroups(state, payload) {
    state.groups = []
    payload.forEach((it) => {
      state.groups.push({
        group_id: it.group_id,
        group_name: it.group_name,
      })
    })
    // console.log(state.groups)
  },
}

// --------------------ACTIONS---------------------------------------
const actions = {
  // -------BASIC ACTION--------
  changeStateValue(vueContext, payload) {
    vueContext.commit('changeStateValue', payload)
  },

  changeComplexStateSeletedValue(vueContext, payload) {
    vueContext.commit('changeComplexStateSeletedValue', payload)
  },
  changeSimpleStateSeletedValue(vueContext, payload) {
    vueContext.commit('changeSimpleStateSeletedValue', payload)
  },
  setSelectedItem(vueContext, payload) {
    vueContext.commit('setSelectedItem', payload)
  },
  unsetItem(vueContext) {
    vueContext.commit('setNewItem')
    vueContext.commit('resetValid')
  },

  undoChangeStatus(vueContext) {
    // console.log('Tra lai tu ',vueContext.state.selectedItem.status)
    vueContext.commit('undoChangeStatus')
    // console.log('thanh: ',vueContext.state.selectedItem.status)
  },

  async getListItems(vueContext, payload) {
    try {
      const response = await this.$getListUsers(
        payload.pageIndex,
        payload.pageSize
      )

      const errorCode = response.data.error.code
      const data = response.data.data
      if (errorCode === APIs.responses.OK.code) {
        // lay danh sach theo trang
        vueContext.commit('setListItems', data.items)
        // update lai paginge
        vueContext.commit('updatePagingIndex', payload)
        const pageInfor = {
          total_page: data.page_info.total_page,
          start_idx: data.page_info.begin_idx,
        }

        this.app.wait.end('loadingUser')
        return pageInfor
      }
      this.app.wait.end('loadingUser')
      return 1
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  },

  deleteItem(vueContext, payload) {
    const currentUser = Cookies.get('username')
    if (currentUser === vueContext.state.selectedItem.user_name.value) {
      this.$showError(
        this.$router.app,
        'Kh??ng cho ph??p x??a ch??nh t??i kho???n ??ang ????ng nh???p.'
      )
      return
    }
    this.$deleteUser(vueContext.state.selectedItem.user_id)
      .then((response) => {
        const errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('deleteItem')
          vueContext.dispatch('unsetItem')
          this.$showSuccess(this.$router.app, 'X??a ng?????i d??ng th??nh c??ng')
        }

        this.app.wait.end('loadingUser')
      })
      .catch((errors) => {
        // Exceptions
        this.app.wait.end('loadingUser')
      })
  },

  async setSelectedItemWithDetailInfor(vueContext, payload) {
    const lstGroup = []
    // set selection
    vueContext.commit('setSelectedItem', payload.item)
    // set list_group
    const response = await this.$getUser(payload.item.user_id)
    const data = response.data.data.item
    vueContext.commit('setDetailUser', data)
    // group
    data.group_infos.forEach((it) => {
      lstGroup.push({
        group_id: it.group_id,
        group_name: it.group_name,
      })
    })

    vueContext.commit('changeComplexStateSeletedValue', {
      field: 'list_group',
      value: lstGroup,
    })
    // ip
    const ipList = []
    const lstIP = []
    data.user_ip_infos.forEach((it) => {
      ipList.push(it.ip_address)
      lstIP.push({ id: it.id, ip_address: it.ip_address })
    })

    vueContext.commit('changeComplexStateSeletedValue', {
      field: 'ip',
      value: lstIP,
    })
    return 1
  },

  setActionUpdate(vueContext, payload) {
    try {
      if (payload.action === 1) {
        vueContext.dispatch('setGroups')
        // vueContext.dispatch('getListSchedule')
        // update
        // set selection
        return vueContext.dispatch('setSelectedItemWithDetailInfor', payload)
      } else {
        vueContext.commit('setNewItem') // update
      }
      return 1
    } catch (errors) {
      return 1
    }
  },
  getListSchedule(vueContext) {
    this.$getListSchedule().then((response) => {
      const errorCode = response.data.error.code
      const data = response.data.data
      if (errorCode === APIs.responses.OK.code) {
        const lstSchedules = []
        data.items.forEach((s) => {
          lstSchedules.push({
            schedule_id: s.id,
            schedule_name: s.schedule_name,
          })
        })
        // console.log(lstSchedules, 'TEST')
        vueContext.commit('changeStateValue', {
          value: lstSchedules,
          field: 'schedules',
        })
      }
    })
  },
  // setStatus(vueContext) {
  //   let lst_groupid = []
  //   vueContext.state.selectedItem.list_group.value.forEach(element => {
  //     lst_groupid.push(element.group_id)
  //   })

  //   let updateItem = {
  //     user_id: vueContext.state.selectedItem.user_id,
  //     full_name: vueContext.state.selectedItem.full_name.value,
  //     email: vueContext.state.selectedItem.email.value,
  //     phone_number: vueContext.state.selectedItem.phone_number.value,
  //     mobile_number: vueContext.state.selectedItem.mobile_number.value,
  //     unit: vueContext.state.selectedItem.unit.value,
  //     sex: vueContext.state.selectedItem.sex.value,
  //     status: vueContext.state.selectedItem.status,
  //     address: vueContext.state.selectedItem.address.value,
  //     ip: vueContext.state.selectedItem.ip.value,
  //     list_group: lst_groupid.toString(), // vueContext.state.selectedItem.list_group,
  //     birthday: vueContext.state.selectedItem.birthday,
  //     schedule_id: vueContext.state.selectedItem.schedule_id.value
  //   }

  //   this.$updateUser(updateItem)
  //     .then(response => {
  //       let errorCode = response.data.error.code
  //       if (errorCode === APIs.responses.OK.code) {
  //         vueContext.commit('setAfterChangeStatus', updateItem)
  //         this.$showSuccess(
  //           this.$router.app,
  //           'C???p nh???t th??ng tin ng?????i d??ng th??nh c??ng'
  //         )
  //       } else if (APIs.responses[errorCode] != undefined) {
  //         this.$showError(this.$router.app, APIs.responses[errorCode].message)
  //       } else {
  //         let errorMsg = response.data.error.message
  //         this.$showError(
  //           this.$router.app,
  //           '???? x???y ra l???i khi c???p nh???t tr???ng th??i ng?????i d??ng. ' + errorMsg
  //         )
  //       }
  //     })
  //     .catch(errors => {
  //       this.$showErrorNotify(
  //         this.$router.app,
  //         errors,
  //         'Kh??ng th??? k???t n???i ?????n server'
  //       )
  //     })
  // },

  resetPass(vueContext) {
    this.$resetUserPass(vueContext.state.selectedItem)
      .then((response) => {
        const errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          vueContext.dispatch('unsetItem')
          this.$showSuccess(this.$router.app, '???? reset m???t kh???u th??nh c??ng.')
        }
        this.app.wait.end('loadingUser')
      })
      .catch((errors) => {
        // Exceptions
        this.app.wait.end('loadingUser')
      })
  },
  async setGroups(vueContext) {
    try {
      const response = await this.$getListGroupUsers()
      const errorCode = response.data.error.code
      const data = response.data.data
      if (errorCode === APIs.responses.OK.code) {
        vueContext.commit('setGroups', data.items)
      }
      this.app.wait.end('loadingUser')
    } catch (errors) {
      this.app.wait.end('loadingUser')
    }
  },
  deleteIP(vueContext, payload) {
    this.$removeUserIP(payload)
      .then((response) => {
        const errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
        }
      })
      .catch((errors) => {})
  },
  async saveItem(vueContext, payload) {
    const email = /^(([a-zA-Z]{1,}[^<>()[\]\\, !#$%^&*~|{}'?;:\s@"]+(\.[^<>()[\]\\, !#$%^&*~|{}'?;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const email2 = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
    let error = false

    try {
      // check dieu kien khi them moi
      if (vueContext.state.selectedIndex === -1) {
        const usernameCheck = /^[a-zA-Z0-9.\-_$@*!%^&*~|'?;:]{3,30}$/ // /^(([^<>()[\]\\, !#$%^&*~|{}'?;:\s@"]))$/
        if (vueContext.state.selectedItem.user_name.value.includes(' ')) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'user_name',
            message: 'T??n ????ng nh???p kh??ng ???????c ch???a d???u tr???ng',
          })
        }
        if (vueContext.state.selectedItem.user_name.value.trim() === '') {
          error = true
          vueContext.commit('setInvalid', {
            field: 'user_name',
            message: 'Kh??ng ???????c ????? tr???ng',
          })
        } else if (vueContext.state.selectedItem.user_name.value.length > 15) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'user_name',
            message: 'Kh??ng ???????c d??i qu?? 15 k?? t???',
          })
        }
        if (
          usernameCheck.test(vueContext.state.selectedItem.user_name.value) ===
          false
        ) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'user_name',
            message: 'T??n ????ng nh???p kh??ng h???p l???.',
          })
        }

        if (vueContext.state.selectedItem.address.value.trim() === '') {
          error = true
          vueContext.commit('setInvalid', {
            field: 'address',
            message: 'Kh??ng ???????c ????? tr???ng',
          })
        }
        if (vueContext.state.selectedItem.schedule_id.value < 0) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'schedule_id',
            message: 'Kh??ng ???????c ????? tr???ng',
          })
        }
        if (vueContext.state.selectedItem.password.value.trim() === '') {
          error = true
          vueContext.commit('setInvalid', {
            field: 'password',
            message: 'Kh??ng ???????c ????? tr???ng',
          })
        } else if (vueContext.state.selectedItem.password.value.length > 20) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'password',
            message: 'Kh??ng ???????c d??i qu?? 20 k?? t???',
          })
        } else if (
          vueContext.state.selectedItem.password.value.trim().length < 8
        ) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'password',
            message: 'Kh??ng ???????c ng???n qu?? 8 k?? t???',
          })
        }
      } // end check dieu kien

      // check dk chung
      if (vueContext.state.selectedItem.email.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'email',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      } else if (
        email.test(vueContext.state.selectedItem.email.value) === false
      ) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'email',
          message: 'Email kh??ng h???p l???',
        })
      }
      if (
        this.$isHasVietnamese(vueContext.state.selectedItem.email.value) ===
        true
      ) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'email',
          message: 'Email kh??ng h???p l???',
        })
      }
      if (vueContext.state.selectedItem.full_name.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'full_name',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      } else if (vueContext.state.selectedItem.full_name.value.length > 20) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'full_name',
          message: 'Kh??ng ???????c d??i qu?? 20 k?? t???',
        })
      }

      if (vueContext.state.selectedItem.mobile_number.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'mobile_number',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      } else if (
        this.$isMobilePhone(
          vueContext.state.selectedItem.mobile_number.value
        ) === false
      ) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'mobile_number',
          message:
            'S??? ??i???n tho???i kh??ng h???p l???, s??? ??i???n tho???i g???m 10 ch??? s??? v?? thu???c c??c m???ng c???a Vi???t Nam',
        })
      }
      if (
        vueContext.state.selectedItem.mobile_number.value.length < 10 ||
        vueContext.state.selectedItem.mobile_number.value.length > 14
      ) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'mobile_number',
          message: 'S??? ??i???n tho???i kh??ng h???p l???, s??? ??i???n tho???i g???m 10 ch??? s???',
        })
      }
      if (vueContext.state.selectedItem.unit.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'unit',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      }
      if (vueContext.state.selectedItem.address.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'address',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      }
      if (vueContext.state.selectedItem.sex.value === 0) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'sex',
          message: 'Kh??ng ???????c ????? tr???ng',
        })
      }
      // console.log('object')
      if (vueContext.state.selectedItem.list_group.value.length === 0) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'list_group',
          message: 'Ph???i ch???n nh??m ng?????i d??ng',
        })
      }
      // console.log(vueContext.state.selectedItem.phone_number.value,'Phone number')
      if (
        vueContext.state.selectedItem.phone_number.value &&
        vueContext.state.selectedItem.phone_number.value.trim() !== ''
      ) {
        if (vueContext.state.selectedItem.phone_number.value.length < 9) {
          error = true
          // console.log('check font <10')
          vueContext.commit('setInvalid', {
            field: 'phone_number',
            message: 'S??? ??i???n tho???i ph???i c?? ??t nh???t 10 k?? t???.',
          })
        } else if (
          vueContext.state.selectedItem.phone_number.value.length > 11
        ) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'phone_number',
            message: 'S??? ??i???n tho???i ph???i kh??ng qu?? 11 k?? t???.',
          })
        }
      }

      if (vueContext.state.selectedItem.ip.value.length > 0) {
        let isIPGood = true
        vueContext.state.selectedItem.ip.value.forEach((element) => {
          if (this.$isIPAddress(element.ip_address) === false) {
            isIPGood = false
          }
        })

        if (!isIPGood) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'ip',
            message: 'M???t trong c??c ?????a ch??? IP sai ?????nh d???ng.',
          })
          // console.log('M???t trong c??c ?????a ch??? IP sai ?????nh d???ng')
        }
      }
      // console.log(
      //   vueContext.state.selectedItem.schedule_id.value,
      //   'schedule_id'
      // )
      // if (
      //   !vueContext.state.selectedItem.schedule_id.value ||
      //   vueContext.state.selectedItem.schedule_id.value <= 0
      // ) {
      //   error = true
      //   vueContext.commit('setInvalid', {
      //     field: 'schedule_id',
      //     message: 'Kh??ng ???????c ????? tr???ng'
      //   })
      // }
      if (
        vueContext.state.selectedItem.birthday.value &&
        vueContext.state.selectedItem.birthday.value.trim() !== ''
      ) {
        const birthday = moment(vueContext.state.selectedItem.birthday.value)
        if (moment().year() - birthday.year() < 18) {
          error = true
          vueContext.commit('setInvalid', {
            field: 'birthday',
            message: 'Ng??y sinh kh??ng h???p l???.',
          })
          // console.log(vueContext.state.selectedItem.birthday.invalidMsg)
        }
      }
      if (error) return 0

      const lstGroupid = []
      vueContext.state.selectedItem.list_group.value.forEach((element) => {
        lstGroupid.push(element.group_id)
      })

      // return
      // tao item moi value
      const newItem = {
        user_id: vueContext.state.selectedItem.user_id,
        user_name: vueContext.state.selectedItem.user_name.value.trim(),
        password: vueContext.state.selectedItem.password.value,
        full_name: vueContext.state.selectedItem.full_name.value.trim(),
        email: vueContext.state.selectedItem.email.value.trim(),
        phone_number: vueContext.state.selectedItem.phone_number.value,
        mobile_number: vueContext.state.selectedItem.mobile_number.value,
        unit: vueContext.state.selectedItem.unit.value,
        sex: vueContext.state.selectedItem.sex.value,
        status: vueContext.state.selectedItem.status,
        address: vueContext.state.selectedItem.address.value.trim(),
        ip: vueContext.state.selectedItem.ip.value,
        list_group: lstGroupid.toString(), // vueContext.state.selectedItem.list_group,
        birthday: this.$formatDateISOToDbFormat(
          vueContext.state.selectedItem.birthday.value
        ),
        schedule_id: vueContext.state.selectedItem.schedule_id.value,
      }
      // call to add method
      // console.log(newItem,'DOAN NAY')
      if (!error && vueContext.state.selectedIndex === -1) {
        // set user_name va pass_word
        const response = await this.$addUser(newItem)
        const errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          // reset selecte item
          vueContext.dispatch('unsetItem')
          this.app.wait.start('loadingUser')
          vueContext.dispatch('getListItems', {
            pageIndex: 1,
            pageSize: vueContext.state.pageSize,
          })
          this.$showSuccess(this.$router.app, 'Th??m ng?????i d??ng th??nh c??ng')
          return 1
        }
        return 0
      }
      // call to update method0
      if (!error && vueContext.state.selectedIndex !== -1) {
        const response = await this.$updateUser(newItem)
        const errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          // update IP
          newItem.ip.forEach((ip) => {
            this.$addUserIP(newItem.user_id, ip.ip_address)
          })
          // remove IP
          const deleteIP = payload
          if (deleteIP && deleteIP.length > 0) {
            // console.log(deleteIP,'Remove IP');
            deleteIP.forEach((ip) => {
              this.$removeUserIP(ip)
            })
          }
          // reset selectedIP
          vueContext.commit('updateItem', newItem)
          vueContext.dispatch('unsetItem')
          this.$showSuccess(
            this.$router.app,
            'C???p nh???t th??ng tin ng?????i d??ng th??nh c??ng'
          )
          return 1
        }
        return 0
      }
    } catch (errors) {
      return 0
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
