<template>
  <div id="user-list">
    USERS
    <ul>
      <li v-for="user in room.users" :key="user">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserList',
  computed: {
    ...mapState(['room'])
  }
}
</script>

<style>
</style>
