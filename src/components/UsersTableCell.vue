<template>
  <td class="column" :style="`padding-left: ${paddingLeft}`">
    <span>{{ user[property] }}</span>
    <template v-if="hasSubordinates">
      <users-table-cell
        v-for="subUser in user.subordinates"
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
      hasSubordinates () {
        return this.user.subordinates && this.user.subordinates.length > 0
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
</style>
