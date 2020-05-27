<template>
  <div id="play">
    <div v-if="currentGameState == GameState.SETUP">
      Waiting for game to start.
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <question-display></question-display>
      <question-submission></question-submission>
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
import { mapGetters } from 'vuex';
import GameState from '../utils/gameState';
import QuestionSubmission from '../components/QuestionSubmission'
import QuestionDisplay from '../components/QuestionDisplay'

export default {
  name: 'Play',
  components: {
    QuestionSubmission,
    QuestionDisplay,
  },
  data() {
    return {
      GameState
    }
  },
  computed: {
    ...mapGetters(['currentGameState'])
  }
}
</script>

<style>
</style>
