<template>
  <div id="host">
    <div v-if="currentState == GameState.SETUP">      
      <room-code> </room-code>
      <user-list> </user-list>
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
import UserList from '../components/UserList'

export default {
  name: 'Host',
  components: {
    RoomCode,
    UserList
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
    ...mapState(['items'])
  },
}
</script>

<style>
</style>
