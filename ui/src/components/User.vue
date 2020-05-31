<template>
  <div id="user">

    <b-card
    :bg-variant="backgroundColor()"
    :text-variant="textColor()"
    v-on:click="onClick"
    img-left
    img-width="96"
    :img-src="require(`../assets/characters/${characterIcons[user.characterIndex]}`)"
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
import characterIcons from '../utils/characterIcon';

export default {
  name: 'User',
  props: {
    user: Object,
    displayAnswer: Boolean,
    isJudgeable: Boolean,
    showScore: Boolean,
  },
  data() {
    return {
      characterIcons
    }
  },
  methods: {
    onClick() {
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
