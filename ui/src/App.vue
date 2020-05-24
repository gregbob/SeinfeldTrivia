<template>
  <div id="app">
  </div>
</template>

<script>
export default {
name: 'App',
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
