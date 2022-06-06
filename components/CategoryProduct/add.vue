<template>
  <div>
    <div class="d-flex">
      <v-btn text depressed @click="toggle">
        <v-icon>mdi-chevron-left</v-icon>
        Thêm danh mục sản phẩm
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-btn class="text-none mr-3" color="primary" dark depressed
        >Nhân bản</v-btn
      >
      <v-btn class="text-none mr-3" color="primary" dark depressed
        >Đặt lại</v-btn
      >
      <v-btn class="text-none mr-3" color="primary" dark depressed>
        <v-icon class="mr-1">mdi-eye</v-icon>
        Xem trước
      </v-btn>
      <v-btn class="text-none mr-3" color="primary" dark depressed>Lưu</v-btn>
      <v-btn color="secondary" depressed @click="toggle">Hủy</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data: () => ({}),
  methods: {
    toggle() {
      this.$emit('toggle')
    },
  },
}
</script>
