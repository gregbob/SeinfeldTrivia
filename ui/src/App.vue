<template>
  <div id="app">
    <button v-on:click="increment">
      Increment
    </button>

    <button v-on:click="decrement">
      Decrement
    </button>

    {{ count }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions(['increment', 'decrement'])
  },
  computed: {
    ...mapState(['count'])
  },
  mounted() {
    this.$http.get('http://192.168.0.197:3000/test').then((response) => {
      console.log(response.data);
    });

    this.$socket.emit('test', 'hello');
  },
  sockets: {
    connect: function () {
      console.log('socket connected!');
    },
  }
}
</script>

<style>
</style>
