<template>
  <div id="host-form">
    <b-form @submit="onSubmit">      
      <b-form-group label="Number of questions">
        <b-form-input 
        type="number"
        v-model="numQuestions" 
        required
        :min="minQuestions" :max="maxQuestions"></b-form-input>
        <b-form-input 
        type="range"
        v-model="numQuestions"
        :min="minQuestions" :max="maxQuestions"></b-form-input>
      </b-form-group>
      <b-form-group label="Round time in seconds">
        <b-form-input 
        type="number"
        v-model="questionStateTime" 
        required
        :min="minQuestionStateTime" :max="maxQuestionStateTime"></b-form-input>
        <b-form-input 
        type="range"
        v-model="questionStateTime"
        :min="minQuestionStateTime" :max="maxQuestionStateTime"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary"> Create Room </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'HostForm',
  data() {
    return {
      minQuestions: 1,
      maxQuestions: 100,
      numQuestions: 10,
      minQuestionStateTime: 10,
      maxQuestionStateTime: 180,
      questionStateTime: 60,
    };
  },
  methods: {
    ...mapActions(['createRoom']),
    onSubmit(e) {
      e.preventDefault();

      // Add error condition 
      this.createRoom({
        numQuestions: this.numQuestions,
        questionStateTime: this.questionStateTime
      });

      this.$router.push('/host');
    }
  }
}
</script>

<style>
</style>
