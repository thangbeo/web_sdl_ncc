<template>
  <div>
    <div v-if="!open_add" class="page page--table">
      <v-data-table
        :headers="headers"
        :items="list_category_product"
        :search="search"
        :page.sync="page"
        :items-per-page="pageSize"
        hide-default-footer
        loading-text="Xin chờ..."
        no-results-text="Không có kết quả phù hợp"
        no-data-text="Không có dữ liệu"
        fixed-header
        multi-sort
        class="elevation-0 page__table"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-app-bar flat color="white">
            <v-toolbar-title> Danh mục sản phẩm </v-toolbar-title>
          </v-app-bar>
          <v-row>
            <div class="flex-grow-1"></div>
            <v-col>
              <v-text-field
                v-model="search"
                label="Tìm kiếm"
                prepend-inner-icon="mdi-magnify"
                dense
                outlined
                hide-details
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
                color="primary"
                style="min-width: 10px !important; width: 40px"
                depressed
                @click="open_add = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:body="props">
          <draggable :list="props.items" tag="tbody">
            <tr v-for="(item, index) in props.items" :key="`${item}-${index}`">
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.add }}
              </td>
              <td>
                <v-icon small class="page__grab-icon"> mdi-arrow-all </v-icon>
              </td>
              <td>
                <v-icon size="22"> mdi-image-multiple </v-icon>
                <v-icon size="22"> mdi-pencil-circle </v-icon>
                <v-icon size="22"> mdi-close-circle </v-icon>
              </td>
            </tr>
          </draggable>
        </template>
      </v-data-table>

      <pagination
        ref="dmspPagination"
        class="pt-2"
        :page="page"
        :page-size="pageSize"
        :page-count="pageCount"
        depressed="true"
        @changePage="changePage"
        @changePageSize="changePageSize"
      >
      </pagination>
    </div>

    <add v-else @toggle="open_add = !open_add"> </add>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Add from '../../components/CategoryProduct/add'

export default {
  components: {
    Add,
    Draggable,
  },
  data: () => ({
    list_category_product: [
      { stt: 1, name: 'Khách sạn', add: 'Có' },
      { stt: 2, name: 'Nhà hàng', add: 'Có' },
      { stt: 3, name: 'Tour du lịch', add: 'Không' },
    ],
    page: 1,
    pageSize: 50,
    pageCount: 1,
    search: '',
    open_add: false,
  }),
  computed: {
    headers() {
      return [
        { text: 'ID', sortable: false, value: 'stt', width: 50 },
        {
          text: 'Danh mục sản phẩm',
          sortable: false,
          value: 'name',
          width: 300,
        },
        { text: 'Thêm vào Menu', sortable: false, value: 'add', width: 150 },
        { text: 'Sắp xếp', sortable: false, value: 'sort', width: 100 },
        { text: 'Hành động', sortable: false, value: 'actions', width: 50 },
      ]
    },
  },
  methods: {
    changePage(value) {
      this.page = value
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.dmspPagination.reset()
      }
    },
  },
  head() {
    this.$store.commit('app/setTitle', 'Danh mục sản phẩm')
    return {
      title: 'Danh mục sản phẩm',
    }
  },
}
</script>

<style lang="scss" scoped>
.page--table {
  .page {
    &__table {
      margin-top: 20px;
    }

    &__grab-icon {
      cursor: move;
    }
  }
}
</style>
