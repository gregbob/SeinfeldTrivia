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
      this.$socket.emit('addItem', this.inputValue);
      this.inputValue = '';
    }
  },
}
</script>

<style>
</style>
