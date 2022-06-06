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
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <client-only>
                <v-data-table
                  :headers="headerGroup"
                  :loading="$wait.is('loadingGroupUser')"
                  :items="$store.state.groupUsers1.groupList"
                  :search="search"
                  :item-per-page="$store.state.groupUsers1.groupList.length"
                  no-data-text="Không có nhóm nào"
                  no-results-text="Không có kết quả phù hợp"
                  loading-text="Xin chờ..."
                  disable-pagination
                  sort-by="group_name"
                  class="elevation-1"
                  hide-default-header
                  hide-default-footer
                  light
                >
                  <template v-slot:item="{ item }">
                    <template>
                      <tr
                        :class="{
                          'row-active white--text font-weight-bold':
                            item.group_id === selectedId,
                        }"
                      >
                        <td class="text-left" @click="setSelectedItem(item)">
                          {{ item.group_name }}
                        </td>
                      </tr>
                    </template>
                  </template>
                </v-data-table>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <!-- <v-col cols="8" sm="8" md="8" align="center" justify="center">
      <v-card raised height="100%">
        <v-card-title outlined class="d-flex">
          <span class="v-toolbar__title">Thông tin nhóm</span>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-orange white--text"
            @click="toggleDeleteDialog"
            v-if="
              $store.state.groupUsers1.selectedIndex !== -1 &&
                checkRole(Rules.System.GroupUser.actions.delete)
            "
            class="mr-3"
          >
            <v-icon class="pr-1" color="white">mdi-delete</v-icon>Xóa
          </v-btn>
          <v-btn
            style="margin-right: 30px !important"
            class="mr-3"
            color="primary"
            v-if="
              openEditDialog && checkRole(Rules.System.GroupUser.actions.edit)
            "
            @click="saveItem"
          >
            <v-icon class="pr-1" color="white">mdi-content-save-all</v-icon>Cập
            nhật
          </v-btn>
          <v-btn
            id="action-close"
            icon
            color="blue-grey darken-1 white--text"
            v-if="openEditDialog"
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
                        $store.state.groupUsers1.selectedIndex !== -1) ||
                      (!checkRole(Rules.System.GroupUser.actions.add) &&
                        $store.state.groupUsers1.selectedIndex === -1)
                  "
                  :value="selectedItem.group_name.value"
                  @input="change($event, 'group_name')"
                  :error="selectedItem.group_name.invalid"
                  :error-messages="selectedItem.group_name.invalidMsg"
                  label="Tên nhóm *"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  label="Mô tả *"
                  :value="selectedItem.description.value"
                  @input="change($event, 'description')"
                  :error="selectedItem.description.invalid"
                  :error-messages="selectedItem.description.invalidMsg"
                  :disabled="
                    !openEditDialog ||
                      (!checkRole(Rules.System.GroupUser.actions.edit) &&
                        $store.state.groupUsers1.selectedIndex !== -1) ||
                      (!checkRole(Rules.System.GroupUser.actions.add) &&
                        $store.state.groupUsers1.selectedIndex === -1)
                  "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="6" md="6">
                <v-card height="420" class="scroll" v-if="selectedId !== -1">
                  <v-data-table
                    v-if="$store.state.groupUsers1.selectedIndex !== -1"
                    :value="selectedPages"
                    v-model="selectedPages"
                    :headers="headerPage"
                    :items="lstPages"
                    :loading="$wait.is('loadingRole')"
                    :single-select="singleSelect"
                    @click:row="clickPageRow($event)"
                    @item-selected="selectedPageRow($event)"
                    @toggle-select-all="selectAllPageRows($event)"
                    item-key="page_id"
                    :show-select="
                      checkRole(Rules.System.GroupUser.actions.edit)
                    "
                    disable-pagination
                    hide-default-footer
                    class="custom_header_table elevation-1"
                    no-data-text="Không có trang nào trong hệ thống."
                    light
                  ></v-data-table>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-data-table
                  v-if="$store.state.groupUsers1.selectedIndex !== -1"
                  :value="selectedFuncs"
                  v-model="selectedFuncs"
                  :headers="headerFunc"
                  :items="lstSelectedRoles"
                  :single-select="singleSelect"
                  @toggle-select-all="selectAllFuncRows($event)"
                  item-key="role_id"
                  :show-select="checkRole(Rules.System.GroupUser.actions.edit)"
                  class="custom_header_table elevation-1"
                  no-data-text="Không có chức năng phù hợp"
                  disable-pagination
                  hide-default-footer
                  @item-selected="selectedRoleRow($event)"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <yes-no-alert
        :open="openDeleteDialog"
        alertMsg="Bạn có chắc chắn muốn xóa?"
        @toggle="toggleDeleteDialog"
        @OK="deleteItem"
      ></yes-no-alert>
    </v-col> -->
  </v-row>
</template>
<script>
import Rules from '~/assets/configurations/Rules'

export default {
  transition: 'slide-x-reverse-transition',
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
    singleSelect: false,
  }),

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
  },
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
