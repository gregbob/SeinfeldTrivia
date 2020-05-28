<template>
  <div id="user-list">
    <b-list-group> 
      <b-list-group-item v-for="user in room.users" :key="user" class="d-flex align-items-center">
        <b-avatar size="4rem" :src="getRandomAvatar()"> </b-avatar>
        <span class="ml-3"> {{ user}} </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserList',
  computed: {
    ...mapState(['room'])
  },
  methods: {
    getRandomAvatar() {
      const pics = [
        "https://pbs.twimg.com/profile_images/699185091147276288/AQ0Otw5J_400x400.jpg",
        "https://pbs.twimg.com/profile_images/725711186730299392/T8cczeWs_400x400.jpg",
        "https://pbs.twimg.com/profile_images/2962448861/2b4a52fe49415cb7a7230caa0429acc5.jpeg",
        "https://external-preview.redd.it/zIk5UgrZ6Q3sVNX_hNwHwcB0fKFiI0i7R6NnT7v8hgQ.jpg?auto=webp&s=191bd336c1fb43cf972b19f45922ec3d45e22f27"
      ]
      const randomInt = Math.floor(Math.random() * Math.floor(pics.length));

      return pics[randomInt];
    }
  }
}
</script>

<style>

span {
  font-size: 2em;
}
</style>
