<template>
  <div id="play">
    <div v-if="currentGameState == GameState.SETUP">
      Waiting for game to start.
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <input v-model="inputValue" :disabled="submitted">
      <button v-on:click="submitAnswer"> SUBMIT </button>
    </div>
    <div v-else-if="currentGameState == GameState.ANSWER">
      Waiting for host to decide the valid answers.
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
