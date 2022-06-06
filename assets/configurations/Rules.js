const Rules = {
  System: {
    id: 2,
    GroupUser: {
      id: 3,
      actions: {
        view_detail: 2,
        add: 3,
        edit: 4,
        delete: 5,
      },
    },
    User: {
      id: 4,
      actions: {
        view_list: 6,
        add: 7,
        edit: 8,
        delete: 9,
        reset_pass: 10,
      },
    },
  },
}

export default Rules
