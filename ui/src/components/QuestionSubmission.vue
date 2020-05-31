<template>
  <div id="question-submission">
      <div v-if="!submitted">
        <b-form @submit="submitAnswer">      
          <b-form-group>
            <b-form-input v-model="inputValue" required placeholder="Enter answer..."></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary"> Submit </b-button>
        </b-form>
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
