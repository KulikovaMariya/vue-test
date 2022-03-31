<template>
  <table class="table">
    <thead>
      <tr class="table__row">
        <th class="table__header col-1">Имя</th>
        <th class="table__header col-2">Телефон</th>
      </tr>
    </thead>
    <tbody>
    <users-table-row v-for="user in tableData" :key="user.uuid" :user="user" />
    </tbody>
  </table>
</template>

<script>
  import UsersTableRow from "./UsersTableRow";

  export default {
    name: "EmployeesTable",
    components: { UsersTableRow },
    props: {
      tableData: {
        type: Array,
        required: true
      }
    },
    methods: {
    
    }
  }
</script>

<style scoped>
  .table {
    width: 100%;
    padding: 20px;
  }
  .table__row {
    display: flex;
    text-align: start;
    border-bottom: 1px solid #EBEEF5;
  }
  .table__header {
    display: inline;
    text-align: start;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    color: #606266;
  }
  .table__data {
    line-height: 30px;
    font-size: 18px;
    font-weight: normal;
    color: #606266;
    
  }
  .col-1 {
    flex-grow: 2;
  }
  .col-2 {
    flex-grow: 1;
  }
</style>
