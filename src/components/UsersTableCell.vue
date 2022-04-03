<template>
  <td class="column" :style="`padding-left: ${paddingLeft}`">
    <div>
      <i
        v-if="isToggleable && hasSubordinates"
        :class="classNames"
        @click="toggle"
      />
      <span>{{ user[property] || 'NULL' }}</span>
    </div>
    <template v-if="hasSubordinates">
      <users-table-cell
        v-for="subUser in user.subordinates"
        v-if="isVisible"
        :key="subUser.uuid"
        :user="subUser"
        :property="property"
        :padding-left="paddingLeft"
      />
    </template>
  </td>
</template>

<script>
  export default {
    name: "UsersTableCell",
    props: {
      user: {
        type: Object,
        required: true
      },
      property: {
        type: String,
        required: true
      },
      paddingLeft: {
        type: String,
        default: '0'
      }
    },
    computed: {
      classNames () {
        return ['icon', this.isVisible ? 'el-icon-minus' : 'el-icon-plus']
      },
      isToggleable () {
        return this.property === 'name'
      },
      hasSubordinates () {
        return this.user.subordinates && this.user.subordinates.length > 0
      },
      isVisible () {
        return !this.$store.getters.toggledUsersUUID.includes(this.user.UUID)
      }
    },
    methods: {
      toggle () {
        this.$store.dispatch('SET_TOGGLED_USER', this.user.UUID)
      }
    }
  }
</script>

<style scoped>
  .column {
    display: flex;
    flex-direction: column;
    text-align: start;
  }
  .column::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #606266;
  }
  .icon {
    margin-left: -20px;
  }
</style>
