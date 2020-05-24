<template>
  <div id="home">
    <router-link to="/host">Go to Host</router-link>
    <div id="join-info">
      <label> Name </label>
      <input id="player-name" v-model="playerName">
      <label> Room Code </label>
      <input id="room-code" v-model="roomCode">
      <button v-on:click="joinRoom"> Join Room </button>
      <!-- <router-link to="/play">Join</router-link> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      playerName: '',
      roomCode: ''
    };
  },
  methods: {
    joinRoom() {
      console.log(`${this.playerName}, ${this.roomCode}`);
      this.$router.push(`/play/${this.roomCode}`);
    }
  }
}
</script>

<style>
#join-info {
  display: flex;
  flex-direction: column;
}
</style>
