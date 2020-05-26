<template>
  <div id="question-submission">
      <div v-if="!submitted">
        <input v-model="inputValue">
        <button v-on:click="submitAnswer"> SUBMIT </button>
      </div>
      <div v-else> 
        Answer submitted.
      </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionSubmission',
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    submitAnswer() {
      const payload = { answer: this.inputValue }
      this.$socket.emit('submitAnswer', payload, (response) => {
        // If response is true, disable submit box and wait for state update
        if (response) {
          this.inputValue = '';
          this.submitted = true;
        }
      });
    }
  }
}
</script>

<style>
</style>
