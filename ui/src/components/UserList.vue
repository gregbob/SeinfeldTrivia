<template>
  <div id="user-list">
    <b-list-group>  
      <user class="mb-2"
      :displayAnswer="displayAnswer" 
      :isJudgeable="isJudgeable"
      :showScore="showScore"
      :user="user" v-for="user in userList" :key="user.name"
      > 
      </user>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    showScore: Boolean
  },
  computed: {
    ...mapState(['room']),
    ...mapGetters(['userAnswers']),
    userList() {
      if (this.shouldDisplaySubmitted) {
        return this.userAnswers;
      }
      if (this.showScore) {
        return this.room.users.slice().sort((a, b) => {
          return new Number(b.score) - new Number(a.score);
        })
      }
      return this.room.users;
    }
  }
}
</script>

<style>
span {
  font-size: 2em;
}
</style>
