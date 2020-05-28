<template>
  <div id="host">
    <div v-if="currentGameState == GameState.SETUP">
      <b-card class="m-2">
        <h4> Room: {{ room.roomCode }} </h4>
        <h5> Players: </h5>
        <user-list> </user-list>
        <b-button class="mt-3" variant="primary" v-on:click="startGame"> START GAME </b-button>
      </b-card>
    </div>
    <div v-else-if="currentGameState == GameState.QUESTION">
      <question-display> </question-display>
      <user-list> </user-list>
      <timer :startTime="questionStateTime"></timer>
    </div>
    <div v-else-if="currentGameState == GameState.JUDGEMENT">
      {{ currentAnswer }}
      <ul>
        <answer v-for="user in users" :key="user.id" :user="user"></answer>
      </ul>
      <button v-on:click="nextQuestion"> Next Question </button>
    </div>
    <div v-else-if="currentGameState == GameState.RESULT">
      <ul>
        <li v-for="user in users" :key="user.id" :user="user">
          Name: {{ user.name }}, Score: {{ user.score }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameState from '../utils/gameState'
import UserList from '../components/UserList'
import Timer from '../components/Timer'
import Answer from '../components/Answer'
import QuestionDisplay from '../components/QuestionDisplay'

export default {
  name: 'Host',
  components: {
    UserList,
    Timer,
    Answer,
    QuestionDisplay
  },
  data() {
    return {
      GameState
    };
  },
  methods: {
    startGame() {
      this.$socket.emit('startGame');
    },
    nextQuestion() {
      const payload = this.users.reduce((obj, user) => {
        obj[user.id] = user.validAnswer;
        return obj;
      }, {})
      this.$socket.emit('answersJudged', payload);
    }
  },
  computed: {
    ...mapState(['items', 'room']),
    ...mapGetters(['currentGameState', 'users', 'questionStateTime', 'currentAnswer'])
  }
}
</script>

<style>
</style>
