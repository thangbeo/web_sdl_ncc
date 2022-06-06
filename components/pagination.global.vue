<template>
  <v-col
    :class="(depressed && 'depressed-pagination') + ' pt-0 pb-0'"
    cols="12"
  >
    <v-row no-gutters class="justify-sm-end justify-center">
      <v-col class="d-flex align-center justify-end col-auto">
        <div style="width: 100px">
          <!-- Chọn page size -->
          <v-select
            :value="pageSize"
            :items="$store.state.app.pageSizes"
            label="Bản ghi"
            outlined
            dense
            hide-details
            class="mt-1 mr-2"
            @change="changePageSize"
          ></v-select>
        </div>
        <div style="width: 150px" class="mt-1">
          <!-- Nhập trang cần đến -->
          <v-text-field
            v-model="customPage"
            type="number"
            label="Trang"
            placeholder=" "
            outlined
            dense
            hide-details
            @keyup.enter="checkPage($event)"
          >
            <template v-slot:append-outer>
              <!-- Nút bấm chuyển trang -->
              <v-btn
                color="primary"
                style="margin-top: -6px"
                depressed
                @click="changePage"
                >Đi</v-btn
              >
            </template>
          </v-text-field>
        </div>
      </v-col>
      <v-col :key="pageCount" class="col-auto" style="min-width: 10%">
        <div class="ml-2">
          <!-- Phân trang theo nút -->
          <v-pagination
            :value="page"
            :length="pageCount"
            total-visible="10"
            @input="changePageButton($event)"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['pageCount', 'page', 'pageSize', 'depressed'],
  data() {
    return {
      customPage: 1,
      rerender: Math.random(),
    }
  },
  watch: {
    page(value) {
      this.rerender = Math.random()
    },
  },

  methods: {
    changePageSize(value) {
      this.customPage = 1
      this.$emit('changePageSize', value)
      // this.getTransationsHistory()
    },
    checkPage(e) {
      const value = e.target.value
      if (isNaN(value) || parseInt(value) <= 0) {
        this.customPage = 1
      } else {
        this.customPage = parseInt(value)
      }
      this.changePage(parseInt(value))
      // this.$emit('changePage')
      // this.$emit('changePageSize')
    },
    changePage(value) {
      if (isNaN(this.customPage)) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else if (this.customPage < 1) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else if (this.customPage > this.pageCount) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else {
        this.$emit('changePage', parseInt(this.customPage))
      }
      // this.getTransationsHistory()
    },
    changePageButton(value) {
      this.customPage = parseInt(value)
      this.$emit('changePage', parseInt(this.customPage))
      // this.$log.debug(changePageButton)
      // this.getTransationsHistory()
    },
    reset() {
      this.customPage = 1
    },
  },
}
</script>

<style lang="scss">
.depressed-pagination {
  .v-pagination__item {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
  }
  .v-pagination__item:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__navigation {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
    width: 36px;
  }

  .v-pagination__navigation:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__item--active:hover {
    background-color: #42a5f5 !important;
    border-color: #42a5f5 !important;
  }
}
</style>
