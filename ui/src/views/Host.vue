<template>
  <div id="host">
    <div v-if="currentState == GameState.SETUP">      
      <room-code> </room-code>
      USERS
      <ul>
        <li v-for="user in room.users" :key="user">
          {{ user }}
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in items" :key="item.message">
          {{ item.message }}
        </li>
      </ul>
    </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GameState from '../utils/gameState'
import RoomCode from '../components/RoomCode'

export default {
  name: 'Host',
  components: {
    RoomCode
  },
  data() {
    return {
      GameState,
      currentState: GameState.SETUP
    };
  },
  mounted() {
    console.log(GameState);
  },
  computed: {
    ...mapState(['items', 'room'])
  },
}
</script>

<style>
</style>
