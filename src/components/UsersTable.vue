<template>
  <div class="table">
    <div class="table__header">
      <div class="table__title column-1" @click="onclick('name')">
        <span>Имя</span>
        <i v-if="sortingParams.field === 'name'" :class="getClassName()" />
      </div>
      <div class="table__title column-2" @click="onclick('phoneNumber')">
        <span>Телефон</span>
        <i v-if="sortingParams.field === 'phoneNumber'" :class="getClassName()" />
      </div>
    </div>
      <div class="table__body">
        <div class="column-1">
          <users-table-cell
            v-for="user in tableData"
            :key="user.uuid"
            :user="user"
            :property="'name'"
            :padding-left="'20px'"
          />
        </div>
        <div class="column-2">
          <users-table-cell
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
  import UsersTableCell from '@/components/UsersTableCell'

  export default {
    name: "UsersTable",
    components: { UsersTableCell },
    props: {
      tableData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        sortingParams: {
          field: '',
          direction: 0
        }
      }
    },
    methods: {
      getClassName () {
        switch (this.sortingParams.direction) {
          case 1:
            return 'el-icon-bottom'
          case -1:
            return 'el-icon-top'
        }
      },
      onclick (field) {
        this.setSortingDirection(field)
        // TODO передать sortingParams
        this.$store.dispatch('SORT_USERS', { field: field, direction: this.sortingParams.direction })
      },
      setSortingDirection (field) {
       if (this.sortingParams.field !== field) {
         this.sortingParams.field = field
         this.sortingParams.direction = 1
       } else {
         this.sortingParams.direction *= -1
        }
      }
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
  .table__title.column-1,
  .table__title.column-2 {
    text-align: center;
    border-bottom: 0;
    display: block;
  }
</style>
