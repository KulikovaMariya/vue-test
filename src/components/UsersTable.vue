<template>
  <table class="table">
    <thead>
      <tr class="table__row">
        <th class="table__header col-1">Имя</th>
        <th class="table__header col-2">Телефон</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableData" :key="data.name" class="table__row">
        <td class="table__data col-1">{{ data.name }}</td>
        <td class="table__data col-2">{{ data.phoneNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  // npm
  // models
  // rest
  // utils
  // components
  // views

  export default {
    name: "EmployeesTable",
    props: {
      tableData: {
        type: Array,
        required: true
      }
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
