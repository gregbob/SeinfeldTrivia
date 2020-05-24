<template>
  <div id="app">
    <input v-model="inputValue">
    <button v-on:click="pushItem"> SUBMIT </button>

    <ul>
      <li v-for="item in items" :key="item.message">
        {{ item.message }}
      </li>
    </ul>
    <router-link to="/host">Go to Host</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapActions([]),
    pushItem() {
      this.$socket.emit('addItem', this.inputValue);
      this.inputValue = '';
    }
  },
  computed: {
    ...mapState(['items'])
  },
  mounted() {
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
