<template>
  <div id="play">
    <div v-if="currentGameState == GameState.SETUP">
      <b-card class="m-2" :title="`Connected to ${room.roomCode}`">
        <b-card-text> 
          Waiting for game to start.
        </b-card-text>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <b-card class="m-2" :title="currentQuestion"> 
        <question-submission></question-submission>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.JUDGEMENT">
      <b-card class="m-2" title="Waiting for host to judge which answers are valid."> 
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
import { mapGetters, mapState } from 'vuex';
import GameState from '../utils/gameState';
import QuestionSubmission from '../components/QuestionSubmission';
import UserList from '../components/UserList';

export default {
  name: 'Play',
  components: {
    QuestionSubmission,
    UserList
  },
  data() {
    return {
      GameState
    }
  },
  computed: {
    ...mapState(['room']),
    ...mapGetters(['currentGameState', 'currentQuestion'])
  }
}
</script>

<style>
</style>
