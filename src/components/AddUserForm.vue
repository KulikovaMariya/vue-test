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
        <el-select v-model="user.supervisorUUID" placeholder=" ">
          <el-option
            v-for="supervisor in supervisors"
            :key="supervisor.UUID"
            :label="supervisor.name"
            :value="supervisor.UUID">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-button :disabled="isDisabledBtn" type="primary" @click="onClick">Сохранить</el-button>
  </div>
</template>

<script>
import { getUsersFlatList } from '@/store/helpers'

  export default {
    name: "EmployeeForm",
    data () {
      return {
        user: {
          name: null,
          phoneNumber: null,
          supervisorUUID: null
        }
      }
    },
   computed: {
    supervisors () {
      return getUsersFlatList(this.$store.getters.users)
    },
    isDisabledBtn () {
      if (this.user.name === null || this.user.phoneNumber === null) {
        return true
      }
    }
   },
    methods: {
      onClick () {
        this.$emit('save', this.user)
        this.resetUser()
      },
      resetUser () {
        const keys = Object.keys(this.user)
        keys.forEach(key => this.user[key] = null)
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
