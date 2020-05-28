<template>
  <div id="room-code">
    <h2> Room: {{ room.roomCode }} </h2>
  </div>
</template>

<script>
/**
 * This component should be responsible for retrieving the room code from the server and displaying it
 */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RoomCode',
  computed: {
    ...mapState(['room'])
  },
  methods: {
    ...mapActions(['createRoom'])
  },
  mounted() {
    this.createRoom();
  }
}
</script>

<style>
</style>
