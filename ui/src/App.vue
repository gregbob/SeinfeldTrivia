<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
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
