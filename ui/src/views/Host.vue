<template>
  <div id="host">
    <div v-if="currentGameState == GameState.SETUP">      
      <room-code> </room-code>
      <user-list> </user-list>
      <button v-on:click="startGame"> START GAME </button>
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      Where street does Jerry Seinfeld live on?
      <timer :startTime="roundTime"></timer>
    </div>
    <div v-else-if="currentGameState == GameState.RESULT">
      West 81st Street
      <ul>
        <li v-for="user in userAnswers" :key="user">
          User: {{ user.name }}, Answer: {{ user.currentAnswer }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameState from '../utils/gameState'
import RoomCode from '../components/RoomCode'
import UserList from '../components/UserList'
import Timer from '../components/Timer'

export default {
  name: 'Host',
  components: {
    RoomCode,
    UserList,
    Timer
  },
  data() {
    return {
      GameState
    };
  },
  methods: {
    startGame() {
      this.$socket.emit('startGame');
    }
  },
  computed: {
    ...mapState(['items', 'room']),
    ...mapGetters(['currentGameState', 'userAnswers', 'roundTime'])
  }
}
</script>

<style>
</style>
