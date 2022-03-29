<template>
  <div class="form">
    <el-row :gutter="20">
      <el-col :span="8" class="form__label">
       <span>Имя</span>
      </el-col>
      <el-col :span="16">
        <el-input v-model="user.name" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" >
        <span class="form__label">Телефон</span>
      </el-col>
      <el-col :span="16">
        <el-input v-model="user.phoneNumber" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span class="form__label">Начальник</span>
      </el-col>
      <el-col :span="16">
        <el-select v-model="user.supervisor" placeholder=" ">
          <el-option
            v-for="supervisor in supervisors"
            :key="supervisor.id"
            :label="supervisor.name"
            :value="supervisor.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-button type="primary" @click="onClick">Сохранить</el-button>
  </div>
</template>

<script>
  // npm
  // models
  // rest
  // utils
  // components
  // views

  export default {
    name: "EmployeeForm",
    data () {
      return {
        supervisors: [
          {
            name: 'Vasya',
            id: 1
          }
        ],
        user: {
          name: null,
          phoneNumber: null,
          supervisor: null
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('save', this.user)
      }
    }
  }
</script>

<style scoped>
  >>>.el-row {
    margin-bottom: 20px;
  }
  >>>.el-button {
    width: 100%;
  }
  .form__label {
    line-height: 40px;
    font-size: 16px;
  }
</style>
