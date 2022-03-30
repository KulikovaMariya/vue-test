<template>
  <div class="container" id="app">
    <el-button class="button" type="primary" @click="dialogIsVisible = true">Добавить</el-button>
    <users-table :table-data="users"/>
    <el-dialog
      title="Добавить пользователя"
      :visible.sync="dialogIsVisible"
      width="40%">
        <add-user-form @save="onSave"/>
    </el-dialog>
  </div>
</template>

<script>
import UsersTable from '@/components/UsersTable'
import AddUserForm from '@/components/AddUserForm'

export default {
  name: 'App',
  components: { UsersTable, AddUserForm },
  data () {
    return {
      localStorage: window.localStorage,
      dialogIsVisible: false,
      users: [{
        name: 'petya',
        phoneNumber: 76467464,
        id: 9,
        subordinate: [
          {
            name: 'vasya',
            phoneNumber: 999999,
            id: 10,
          }
        ]
      }]
    }
  },
  methods: {
    onSave (user) {
      this.dialogIsVisible = false
      this.users.push(user)
      this.localStorage.setItem('users', JSON.stringify(this.users))
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 50%;
    margin: auto;
    text-align: end;
    font-family: "PT Sans", sans-serif;
  }
  .button {
    margin-bottom: 50px;
  }
  >>>.el-dialog {
    text-align: start;
    color: #606266;;
  }
</style>
