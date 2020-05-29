<template>
  <div id="user">
      <b-list-group-item 
        :button="isJudgeable" 
        v-on:click="onClick" 
        :variant="getVariant()" 
        class="d-flex align-items-center"
        >
        <b-avatar size="3.5rem" :src="getRandomAvatar()"> </b-avatar>
        <span class="ml-3"> {{ user.name }} </span>
        <span v-if="displayAnswer">:</span>
        <span v-if="displayAnswer" class="ml-3"> {{ user.currentAnswer }} </span>
      </b-list-group-item>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object,
    displayAnswer: Boolean,
    isJudgeable: Boolean,
    shouldDisplaySubmitted: Boolean,
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
      if (this.isJudgeable) {
        this.user.validAnswer = !this.user.validAnswer;
      }
    },
    getVariant() {
      console.log('hello', this.user, this.shouldDisplaySubmitted);
      if (this.user.validAnswer || (this.shouldDisplaySubmitted && this.user.currentAnswer)) {
        return "success"
      }
      return "";
    }
  }
}
</script>

<style>

span {
  font-size: 2em;
}
</style>
