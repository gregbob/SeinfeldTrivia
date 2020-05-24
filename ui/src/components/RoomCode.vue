<template>
  <div id="room-code">
    Code: {{ roomCode }}
  </div>
</template>

<script>
/**
 * This component should be responsible for retrieving the room code from the server and displaying it
 */

export default {
  name: 'RoomCode',
  data() {
    return {
      roomCode: ''
    };
  },
  mounted() {
    this.$http.post('http://192.168.0.197:3000/create-room').then((response) => {
      console.log(response);
      this.roomCode = response.data.roomCode;
    }); 
  }
}
</script>

<style>
</style>
