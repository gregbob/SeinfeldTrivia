<template>
  <div id="user-list">
    <b-list-group> 
      <user 
      :displayAnswer="displayAnswer" 
      :isJudgeable="isJudgeable" 
      :shouldDisplaySubmitted="shouldDisplaySubmitted"
      :user="user" v-for="user in room.users" :key="user.name"
      > 
      </user>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import User from './User'

export default {
  name: 'UserList',
  components: {
    User
  },
  props: {
    displayAnswer: Boolean,
    isJudgeable: Boolean,
    shouldDisplaySubmitted: Boolean,
  },
  computed: {
    ...mapState(['room'])
  }
}
</script>

<style>

span {
  font-size: 2em;
}
</style>
