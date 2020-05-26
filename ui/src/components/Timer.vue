<template>
  <div id="timer">
    {{ time }}
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    startTime: Number
  },
  data() {
    return {
      time: 0,
      timerIntervalId: ''
    }
  },
  methods: {
    startTimer() {
      this.time = this.startTime;
      this.timerIntervalId = setInterval(() => { this.time -= 1 }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerIntervalId);
    }
  },
  mounted() {
    this.startTimer();
  }
}
</script>

<style>
</style>
