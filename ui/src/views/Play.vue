<template>
  <div id="play">
    <div v-if="currentGameState == GameState.SETUP">
      Waiting for game to start.
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <div v-if="!submitted">
        <input v-model="inputValue">
        <button v-on:click="submitAnswer"> SUBMIT </button>
      </div>
      <div v-else> 
        Answer submitted.
      </div>
    </div>
    <div v-else-if="currentGameState == GameState.JUDGEMENT">
      Waiting for host to judge which answers are valid.
    </div>
    <div v-else-if="currentGameState == GameState.RESULT">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameState from '../utils/gameState';

export default {
  name: 'Play',
  data() {
    return {
      inputValue: '',
      submitted: false,
      GameState
    }
  },
  computed: {
    ...mapGetters(['currentGameState'])
  },
  methods: {
    submitAnswer() {
      const payload = { answer: this.inputValue }
      this.$socket.emit('submitAnswer', payload, (response) => {
        // If response is true, disable submit box and wait for state update
        console.log(response);
        this.inputValue = '';
        this.submitted = true;
      });
    }
  }
}
</script>

<style>
</style>
