<template>
  <div id="timer">
    <h5>Time remaining: {{Math.round(time)}} </h5>
    <b-progress v-if="active" height="2em" class="mt-3" :value="time" :max="startTime" animated></b-progress>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    startTime: Number || String
  },
  data() {
    return {
      time: 0,
      timerIntervalId: '',
      tickTime: .012,
      active: false
    }
  },
  methods: {
    startTimer() {
      this.active = true
      this.time = new Number(this.startTime);
      this.timerIntervalId = setInterval(() => { this.time -= this.tickTime }, this.tickTime * 1000);
    },
    stopTimer() {
      this.active = false;
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
