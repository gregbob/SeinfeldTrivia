<template>
  <div id="app">
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand to="/">Seinfeld Trivia</b-navbar-brand>
    </b-navbar>
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
