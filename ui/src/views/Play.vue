<template>
  <div id="play">
    <input v-model="inputValue">
    <button v-on:click="pushItem"> SUBMIT </button>
  </div>
</template>

<script>

export default {
  name: 'Play',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    pushItem() {
      const payload = {
        answer: this.inputValue,
        roomCode: this.$route.params.roomCode
      }
      this.$socket.emit('submitAnswer', payload, (response) => {
        // If response is true, disable submit box and wait for state update
        console.log(response);
      });

      this.inputValue = '';
    }
  },
}
</script>

<style>
</style>
