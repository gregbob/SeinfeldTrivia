<template>
  <div id="host">
    <div v-if="currentGameState == GameState.SETUP">      
      <room-code> </room-code>
      <user-list> </user-list>
      <button v-on:click="startGame"> START GAME </button>
    </div>
    <div v-else-if="currentGameState == GameState.DISPLAY_QUESTION">
      Where street does Jerry Seinfeld live on?
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GameState from '../utils/gameState'
import RoomCode from '../components/RoomCode'
import UserList from '../components/UserList'

export default {
  name: 'Host',
  components: {
    RoomCode,
    UserList
  },
  data() {
    return {
      GameState
    };
  },
  methods: {
    startGame() {
      this.$socket.emit('startGame', {roomCode: this.room.roomCode});
    }
  },
  computed: {
    ...mapState(['items', 'currentGameState', 'room'])
  },
}
</script>

<style>
</style>
