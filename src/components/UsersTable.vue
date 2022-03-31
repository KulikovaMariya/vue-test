<template>
  <div class="table">
    <div class="table__header">
      <div class="table__title column-1">Имя</div>
      <div class="table__title column-2">Телефон</div>
    </div>
      <div class="table__body">
        <div class="column-1">
          <users-table-column
            v-for="user in tableData"
            :key="user.uuid"
            :user="user"
            :property="'name'"
            :padding-left="'20px'"
          />
        </div>
        <div class="column-2">
          <users-table-column
            v-for="user in tableData"
            :key="user.uuid"
            :user="user"
            :property="'phoneNumber'"
          />
        </div>
      </div>
  </div>
</template>

<script>
  import UsersTableColumn from './UsersTableColumn'

  export default {
    name: "EmployeesTable",
    components: { UsersTableColumn },
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
  .table__body {
    position: relative;
    display: flex;
    width: 100%;
    line-height: 30px;
    font-size: 18px;
    font-weight: normal;
    color: #606266;
  }
  .table__header {
    display: flex;
    text-align: start;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    color: #606266;
  }
  .table__title {
    padding-left: 20px;
    border: 0;
  }
  .column-1,
  .column-2 {
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid #606266;
  }
  .column-2 {
    padding-left: 20px;
    border-left: 0;
  }
</style>
