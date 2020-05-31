<template>
  <div id="user">

    <b-card
    :bg-variant="backgroundColor()"
    :text-variant="textColor()"
    v-on:click="onClick"
    img-left
    img-width="128"
    :img-src="getRandomAvatar()"
    :title="user.name"> 
      <b-card-text v-if="displayAnswer">
        {{ user.currentAnswer }}
      </b-card-text>
      <b-card-text v-if="showScore">
        {{ user.score }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object,
    displayAnswer: Boolean,
    isJudgeable: Boolean,
    showScore: Boolean
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
    },
    onClick() {
      console.log('///');
      if (this.isJudgeable) {
        this.user.validAnswer = !this.user.validAnswer;
      }
    },
    getVariant() {
      if (this.user.validAnswer) {
        return "success"
      }
      return "";
    },
    backgroundColor() {
      if (this.user.validAnswer) {
        return "primary"
      }
      return "";
    },
    textColor() {
      if (this.user.validAnswer) {
        return "white"
      }
      return "black";
    }
  }
}
</script>

<style>
#user:hover {
  cursor: pointer;
}

</style>
