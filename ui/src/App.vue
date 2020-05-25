<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  sockets: {
    connect: function () {
      console.log('socket connected!');
    },
  }
}
</script>

<style>
</style>
