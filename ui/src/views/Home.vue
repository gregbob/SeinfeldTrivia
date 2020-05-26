<template>
  <div id="home">
    <router-link to="/host">Go to Host</router-link>
    <div id="join-info">
      <label> Name </label>
      <input id="user-name" v-model="userName">
      <label> Room Code </label>
      <input id="room-code" v-model="roomCode">
      <button v-on:click="addUser(userName, roomCode)"> Join Room </button>
      <!-- <router-link to="/play">Join</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userName: '',
      roomCode: ''
    };
  },
  methods: {
    addUser() {
      const payload = {
        roomCode: this.roomCode,
        user: {
          name: this.userName
        }
      };
      this.$socket.emit('addUser', payload, (response) => {
        if (response == true) {
          this.$router.push(`/play`);
        }
      });
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
