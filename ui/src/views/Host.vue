<template>
  <div id="host">
    <div v-if="currentGameState == GameState.SETUP">
      <b-card class="m-2">
        <h4> Room: {{ room.roomCode }} </h4>
        <h5> Players: </h5>
        <user-list class="mt-3"> </user-list>
        <b-button class="mt-3" variant="primary" v-on:click="startGame"> START GAME </b-button>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <b-card class="m-2">
        <h4> Question: {{currentQuestion}} </h4>
        <h5> Players that have submitted answers: </h5>
        <user-list :shouldDisplaySubmitted="true" class="mt-3"> </user-list>
        <timer class="mt-3" :startTime="questionStateTime"></timer>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.JUDGEMENT">
      <b-card class="m-2">
        <h4> Answer: {{currentAnswer}} </h4>
        <h5> Select the players with valid answers: </h5>
        <user-list class="mt-3" :isJudgeable="true" :displayAnswer="true"> </user-list>
        <b-button class="mt-3" variant="primary" v-on:click="nextQuestion"> Next Question </b-button>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.RESULT">
      <b-card class="m-2"> 
        <h4> Results </h4>
        <user-list class="mt-3" :showScore="true"> </user-list>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameState from '../utils/gameState'
import UserList from '../components/UserList'
import Timer from '../components/Timer'

export default {
  name: 'Host',
  components: {
    UserList,
    Timer,
  },
  data() {
    return {
      GameState
    };
  },
  methods: {
    startGame() {
      this.$socket.emit('startGame');
    },
    nextQuestion() {
      const payload = this.users.reduce((obj, user) => {
        obj[user.id] = user.validAnswer;
        return obj;
      }, {})
      this.$socket.emit('answersJudged', payload);
    }
  },
  computed: {
    ...mapState(['items', 'room']),
    ...mapGetters(['currentGameState', 'users', 'questionStateTime', 'currentAnswer', 'currentQuestion'])
  }
}
</script>

<style>
</style>
