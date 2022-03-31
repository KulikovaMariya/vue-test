<template>
  <tr class="table__row">
    <td class="table__data col-1">
      <div>{{ user.name }}</div>
      <template v-if="user.subordinates && user.subordinates.length > 0">
        <users-table-row v-for="subUser in user.subordinates" :key="subUser.uuid" :user="subUser" />
      </template>
    </td>
    <td class="table__data col-2">{{ user.phoneNumber }}</td>
  </tr>
</template>

<script>
  // npm
  // models
  // rest
  // utils
  // components
  // views

  export default {
    name: "UsersTableRow",
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
