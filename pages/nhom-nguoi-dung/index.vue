<template>
  <v-row>
    <v-col cols="4" sm="4" md="4" align="center" justify="center">
      <v-card raised class="mx-auto" height="100%">
        <v-card-title outlined class="d-flex">
          <span class="v-toolbar__title">Nhóm người dùng</span>
          <v-spacer></v-spacer>
          <client-only>
            <v-btn
              v-if="checkRole(Rules.System.GroupUser.actions.add)"
              color="primary"
              @click="setNewItem"
              >Thêm mới</v-btn
            >
          </client-only>
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="search"
                dense
                label="Tìm kiếm"
                single-line
                outlined
                hide-details
                placeholder="Tìm kiếm"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <client-only>
                <v-data-table
                  :headers="headerGroup"
                  :loading="$wait.is('loadingGroupUser')"
                  :items="items"
                  :search="search"
                  :item-per-page="itemPerPage"
                  no-data-text="Không có nhóm nào"
                  no-results-text="Không có kết quả phù hợp"
                  loading-text="Xin chờ..."
                  disable-pagination
                  sort-by="group_name"
                  hide-default-header
                  hide-default-footer
                  class="table-border-space-vertical-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td
                        :class="
                          (item.group_id === selectedId &&
                            'row-active white--text font-weight-bold') +
                          ' text-left border-radius-1 border-1 border-space-vertical-1'
                        "
                        @click="setSelectedItem(item)"
                      >
                        {{ item.group_name }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="8" sm="8" md="8" align="center" justify="center">
      <v-card raised height="100%">
        <v-card-title outlined class="d-flex">
          <span class="v-toolbar__title">Thông tin nhóm</span>
          <v-spacer></v-spacer>
          <v-btn
            v-if="
              selectedIndex !== -1 &&
              checkRole(Rules.System.GroupUser.actions.delete)
            "
            color="deep-orange white--text"
            class="mr-3"
            @click="toggleDeleteDialog"
          >
            <v-icon class="pr-1" color="white">mdi-delete</v-icon>Xóa
          </v-btn>
          <v-btn
            v-if="
              openEditDialog && checkRole(Rules.System.GroupUser.actions.edit)
            "
            style="margin-right: 30px !important"
            class="mr-3"
            color="primary"
            @click="saveItem"
          >
            <v-icon class="pr-1" color="white">mdi-content-save-all</v-icon>Cập
            nhật
          </v-btn>
          <v-btn
            v-if="openEditDialog"
            id="action-close"
            icon
            color="blue-grey darken-1 white--text"
            @click="toggleEditDialog"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  outlined
                  dense
                  :disabled="
                    !openEditDialog ||
                    (!checkRole(Rules.System.GroupUser.actions.edit) &&
                      selectedIndex !== -1) ||
                    (!checkRole(Rules.System.GroupUser.actions.add) &&
                      selectedIndex === -1)
                  "
                  :value="selectedItem.group_name.value"
                  :error="selectedItem.group_name.invalid"
                  :error-messages="selectedItem.group_name.invalidMsg"
                  label="Tên nhóm *"
                  @input="change($event, 'group_name')"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  label="Mô tả *"
                  :value="selectedItem.description.value"
                  :error="selectedItem.description.invalid"
                  :error-messages="selectedItem.description.invalidMsg"
                  :disabled="
                    !openEditDialog ||
                    (!checkRole(Rules.System.GroupUser.actions.edit) &&
                      selectedIndex !== -1) ||
                    (!checkRole(Rules.System.GroupUser.actions.add) &&
                      selectedIndex === -1)
                  "
                  @input="change($event, 'description')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="6" md="6">
                <v-card v-if="selectedId !== -1" height="420" class="scroll">
                  <v-data-table
                    v-if="selectedIndex !== -1"
                    v-model="selectedPages"
                    :value="selectedPages"
                    :headers="headerPage"
                    :items="lstPages"
                    :loading="$wait.is('loadingRole')"
                    :single-select="singleSelect"
                    item-key="page_id"
                    :show-select="
                      checkRole(Rules.System.GroupUser.actions.edit)
                    "
                    disable-pagination
                    hide-default-footer
                    class="custom_header_table elevation-1"
                    no-data-text="Không có trang nào trong hệ thống."
                    light
                    @click:row="clickPageRow($event)"
                    @item-selected="selectedPageRow($event)"
                    @toggle-select-all="selectAllPageRows($event)"
                  ></v-data-table>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-data-table
                  v-if="selectedIndex !== -1"
                  v-model="selectedFuncs"
                  :value="selectedFuncs"
                  :headers="headerFunc"
                  :items="lstSelectedRoles"
                  :single-select="singleSelect"
                  item-key="role_id"
                  :show-select="checkRole(Rules.System.GroupUser.actions.edit)"
                  class="custom_header_table elevation-1"
                  no-data-text="Không có chức năng phù hợp"
                  disable-pagination
                  hide-default-footer
                  @toggle-select-all="selectAllFuncRows($event)"
                  @item-selected="selectedRoleRow($event)"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <yes-no-alert
        :open="openDeleteDialog"
        alert-msg="Bạn có chắc chắn muốn xóa?"
        @toggle="toggleDeleteDialog"
        @OK="deleteItem"
      ></yes-no-alert>
      <!-- <DeleteDialog
        :open="openDeleteDialog"
        :message="deleteMessage"
        @toggle="toggleDeleteDialog"
        @deleteAction="deleteItem"
      />-->
    </v-col>
  </v-row>
</template>
<script>
// import DeleteDialog from '../../components/DeleteDialog'
import { mapState } from 'vuex'
import Rules from '~/assets/configurations/Rules'
// import YesNoAlert from '~/components/YesNoAlert'

export default {
  // middleware: 'user_auth',
  components: {
    // DeleteDialog,
    // YesNoAlert,
  },
  data: () => ({
    Rules,
    headerGroup: [
      {
        text: 'Nhóm',
        align: 'left',
        sortable: false,
        value: 'group_name',
      },
    ],
    headerPage: [
      {
        text: 'Trang',
        align: 'left',
        class: 'body-2',
        sortable: false,
        value: 'page_name',
      },
    ],
    headerFunc: [
      {
        text: 'Chức năng',
        align: 'left',
        sortable: false,
        class: 'body-2',
        value: 'role_name',
      },
    ],
    itemPerPage: 100,
    search: '',
    openConfirmDialog: false,
    confirmMessage: '',
    singleSelect: false,
    selectedPages: [],
    selectedFuncs: [],
    lstSelectedRoles: [],
    openEditDialog: false,
    openDeleteDialog: false,
    deleteMessage: '',
    finalRole: '',
    selectedId: -1,
    // page: 1,
    // itemsPerPage: 5,
    // pageCount: 3
  }),
  computed: {
    ...mapState({
      selectedIndex: (state) => state.groupUsers.selectedIndex,
      selectedItem: (state) => state.groupUsers.selectedItem,
      lstPages: (state) => state.groupUsers.lstPages,
      lstRoles: (state) => state.groupUsers.lstRoles,
      items: (state) => state.groupUsers.items,
    }),
    formTitle() {
      return 'Thêm mới nhóm người dùng.'
    },

    showCurrentRolePage() {
      let str = ''
      this.selectedPages.forEach((p) => {
        const roles = this.selectedFuncs.filter((r) => r.page_id === p.page_id)
        if (roles.length === 0) {
          str += p.page_id + '-0,'
        } else {
          roles.forEach((r0) => {
            str += r0.page_id + '-' + r0.role_id + ','
          })
        }
      })
      return str.substr(0, str.length - 1)
    },
  },
  created() {
    if (!this.$isServer) this.initialize()
  },

  methods: {
    checkRole(actionId) {
      const isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.GroupUser.id,
        actionId
      )
      // if (Rules.System.GroupUser.actions.view_detail === actionId) {
      //   if (!isAllowed) {
      //     this.$nuxt.error({
      //       statusCode: 404
      //     })
      //   }
      // }
      return isAllowed
    },
    initialize() {
      this.$wait.start('loadingGroupUser')
      this.$store.dispatch('groupUsers/setNewItem')
      this.$store.dispatch('groupUsers/getListItems').then((res) => {
        // if (this.items.length > 0) {
        //   let firstItem = this.items[this.items.length - 1]
        //   //console.log(firstItem, 'Select first choose')
        //   //this.selectedId = firstItem.group_id
        //   this.setSelectedItem(firstItem)
        // }
      })
    },
    change(value, field) {
      this.$store.dispatch('groupUsers/changeValue', { value, field })
    },
    setNewItem() {
      this.$store.dispatch('groupUsers/setNewItem')
      this.selectedId = -1
      this.openEditDialog = true
    },

    clickPageRow(row, isClick = false) {
      this.$log.debug('The clicked row: ', row)
      this.lstSelectedRoles = []
      const roles = this.lstRoles.filter((i) => i.page_id === row.page_id)
      roles.forEach((r) => {
        this.lstSelectedRoles.push(r)
      })
      this.$log.debug('All roles in page: ', roles)
      const lstRoleSelected = this.selectedItem.groupPages.filter(
        (i) => i.page_id === row.page_id
      )

      // neu da co role roi thi lam the nay
      // nguoc lai thi chon het cac role trong trang do
      let isHasExistRoleInPage = false
      lstRoleSelected.forEach((r) => {
        const temp = this.selectedFuncs.find(
          (a) => a.page_id === r.page_id && a.role_id === r.role_id
        )
        let tempNameRole = this.lstSelectedRoles.find(
          (b) => b.role_id === r.role_id
        )
        if (tempNameRole !== undefined) tempNameRole = tempNameRole.role_name
        // console.log(temp)
        // neu chua ton tai role trong selectedFuncs va tim thay
        if (temp === undefined && tempNameRole !== undefined) {
          isHasExistRoleInPage = true
          this.selectedFuncs.push({
            role_id: r.role_id,
            page_id: r.page_id,
            role_name: tempNameRole,
          })
        }
      })
      this.$log.debug('Already had roles in page: ', isHasExistRoleInPage)
      if (!isHasExistRoleInPage && isClick) {
        roles.forEach((r) => {
          const temp = this.selectedFuncs.find(
            (a) => a.page_id === r.page_id && a.role_id === r.role_id
          )
          if (temp === undefined)
            this.selectedFuncs.push({
              role_id: r.role_id,
              page_id: r.page_id,
              role_name: r.role_name,
            })
        })
      }
    },
    // check chon select all or uncheck all
    selectAllPageRows(row) {
      // this.$log.debug(this.lstRoles, 'ROLES')
      // this.$log.debug(row.value)
      // return
      // resset all
      const pages = []
      const roles = []
      if (row.value) {
        this.lstPages.forEach((p) => {
          pages.push({
            page_name: p.page_name,
            page_id: p.page_id,
          })
        })
        this.lstRoles.forEach((r) => {
          roles.push({
            role_id: r.role_id,
            page_id: r.page_id,
            role_name: r.role_name,
          })
        })
      }
      // console.log(pages,roles,'CHECK');
      this.selectedFuncs = roles
      this.selectedPages = pages
    },
    // Neu page duoc chon, thi co the show ra cac role cua no
    // neu page KO duoc chon thi xoa het cac role da co cua no
    selectedPageRow(row) {
      this.clickPageRow(row.item, row.value)
      if (row.value === true) {
      } else {
        // remove het role da chon
        const rolesInPage = this.selectedFuncs.filter(
          (a) => a.page_id === row.item.page_id
        )
        // console.log(rolesInPage)
        rolesInPage.forEach((r) => {
          const index = this.selectedFuncs.indexOf(r)
          this.selectedFuncs.splice(index, 1)
          // console.log(index)
        })
      }
    },
    // check chon select all or uncheck all cua bang chuc nang
    selectAllFuncRows(row) {
      if (row.items.length <= 0) {
        return
      }
      const pageId = row.items[0].page_id
      const page = this.selectedPages.find((p) => p.page_id === pageId)
      if (!row.value) {
        if (page !== undefined) {
          const idx = this.selectedPages.indexOf(page)
          this.selectedPages.splice(idx, 1)
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (page === undefined) {
          this.selectedPages.push({
            page_id: row.items[0].page_id,
            page_name: row.items[0].page_name,
          })
        }
      }
      // let pages = []
      // let roles = []
      // if (row.value) {
      //   this.lstPages.forEach(p => {
      //     pages.push({
      //       page_name: p.page_name,
      //       page_id: p.page_id
      //     })
      //   })
      //   this.lstRoles.forEach(r => {
      //     roles.push({
      //       role_id: r.role_id,
      //       page_id: r.page_id,
      //       role_name: r.role_name
      //     })
      //   })
      // }
      // this.selectedFuncs = roles
      // this.selectedPages = pages
    },
    // Neu 1 role duoc chon thi check xem page co duoc chon
    // hay ko? Neu ko thi page do duoc them vao selectedPages
    selectedRoleRow(row) {
      if (row.value === true) {
        const page = this.selectedPages.find(
          (p) => p.page_id === row.item.page_id
        )
        if (page === undefined) {
          this.selectedPages.push({
            page_id: row.item.page_id,
            page_name: this.selectedItem.groupPages.find(
              (p) => p.page_id === row.item.page_id
            ),
          })
        }
      }
    },
    setSelectedItem(item) {
      // console.log(item)
      // return
      this.$store.dispatch('groupUsers/resetValid')
      this.selectedId = item.group_id
      // console.log(this.selectedId, 'SELECTED')
      this.$wait.start('loadingRole')
      this.$store.dispatch('groupUsers/getGroupUser', item).then((res) => {
        if (res === 1) {
          this.selectedPages = []
          this.selectedFuncs = []
          const pages = this.selectedItem.groupPages
          // console.log( pages)
          pages.forEach((p) => {
            if (
              this.selectedPages.find((c) => c.page_id === p.page_id) ===
              undefined
            )
              this.selectedPages.push({
                page_id: p.page_id,
                page_name: p.page_name,
              })
            // get role da chon truoc
            let tempNameRole = this.lstRoles.find(
              (b) => b.role_id === p.role_id
            )
            if (tempNameRole !== undefined)
              tempNameRole = tempNameRole.role_name
            if (tempNameRole != null)
              this.selectedFuncs.push({
                role_id: p.role_id,
                page_id: p.page_id,
                role_name: tempNameRole,
              })
          }) // end foreach
          this.$wait.end('loadingRole')
          this.openEditDialog = true
        }
      })
    },
    saveItem() {
      const groupPage = this.showCurrentRolePage
      this.$store.dispatch('groupUsers/saveItem', groupPage).then((res) => {
        if (res === 1) {
          // this.toggleEditDialog()
        }
      })
    },
    deleteItem() {
      this.$store.dispatch('groupUsers/deleteItem')
      this.selectedId = -1
      this.openEditDialog = false
    },

    toggleEditDialog() {
      this.openEditDialog = !this.openEditDialog
      if (!this.openEditDialog) {
        this.$store.dispatch('groupUsers/unsetItem')
        this.selectedId = -1
      }
    },
    toggleDeleteDialog() {
      this.openDeleteDialog = !this.openDeleteDialog
      if (this.openDeleteDialog)
        this.deleteMessage =
          'Bạn có muốn xóa nhóm ' +
          this.selectedItem.group_name.value +
          ' này không?'
    },
  },
  head() {
    return {
      title: 'Quản lý nhóm người dùng',
    }
  },
  transition: 'slide-x-transition',
}
</script>
<style>
#action-close {
  position: absolute;
  top: 0;
  right: 0;
}
.row-active {
  background-color: #46a9ff !important;
}
.scroll {
  overflow-y: auto;
}
</style>
