<template>
  <div id="join-form">
    <b-form @submit="onSubmit">      
      <b-form-group label="Your Name">
        <b-form-input v-model="name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group label="Room Code">
        <b-form-input v-model="roomCode" required placeholder="Enter room code"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary"> Join Room </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'JoinForm',
  data() {
    return {
      name: '',
      roomCode: ''
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const payload = {
        roomCode: this.roomCode,
        user: {
          name: this.name
        }
      };
      this.$socket.emit('addUser', payload, (response) => {
        if (response == true) {
          this.$router.push(`/play`);
        } else {
          this.$bvToast.toast(`Failed to join room: ${this.roomCode}`, {
            title: 'Error',
            solid: true,
            variant: "danger",
            toaster: 'b-toaster-top-full',
          });
        }
      });
    }
  }
}
</script>

<style>
</style>
