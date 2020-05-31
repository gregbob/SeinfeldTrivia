<template>
  <div id="join-form">
    <b-modal id="icon-modal" title="Select your character" v-on:ok="updateIcon">
      <b-img v-for="(character, index) in characterIcons" :key="index"
        v-bind:class="{selected: index == currentSelectedIndex, clickable: index != currentSelectedIndex}"
        v-on:click="selectCharacter(index)"
        thumbnail
        width="96" 
        height="96" 
        :src="require(`../assets/characters/${character}`)"
        ></b-img>
    </b-modal>

    <b-form @submit="onSubmit">      
      <b-form-group label="Your Name">
        <b-form-input v-model="name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group label="Room Code">
        <b-form-input v-model="roomCode" required placeholder="Enter room code"></b-form-input>
      </b-form-group>
      <b-form-group label="Select your character"> 
        <b-img 
        id="icon-selector"
        class="clickable"
        v-b-modal.icon-modal
        thumbnail 
        width="96" 
        height="96" 
        :src="require(`../assets/characters/${characterIcons[characterIndex]}`)"
        ></b-img>
      </b-form-group>
      <b-button type="submit" variant="primary"> Join Room </b-button>
    </b-form>
  </div>
</template>

<script>
import characterIcons from '../utils/characterIcon';

export default {
  name: 'JoinForm',
  data() {
    return {
      name: '',
      roomCode: '',
      characterIndex: 0,
      currentSelectedIndex: 0,
      characterIcons
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const payload = {
        roomCode: this.roomCode,
        user: {
          name: this.name,
          characterIndex: this.characterIndex
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
    },
    selectCharacter(index) {
      this.currentSelectedIndex = index;
    },
    updateIcon() {
      this.characterIndex = this.currentSelectedIndex;
    }
  }
}
</script>

<style>
.clickable:hover {
  cursor: pointer;
  background: #f8f9fa;
}
.clickable:active {
  background: #007bff;
}
.selected {
  background: #007bff;
}
</style>
