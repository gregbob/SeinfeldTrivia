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
      Waiting for host to judge which answers are valid.
    </div>
    <div v-else-if="currentGameState == GameState.RESULT">
      Results are shown on the host screen.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import GameState from '../utils/gameState';
import QuestionSubmission from '../components/QuestionSubmission'

export default {
  name: 'Play',
  components: {
    QuestionSubmission,
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
