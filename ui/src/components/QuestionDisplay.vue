<template>
  <div id="question-display">
    {{ currentQuestion }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'QuestionDisplay',
  data() {
    return {
      submitted: false
    }
  },
  computed: {
    ...mapGetters(['currentQuestion'])
  }
}
</script>

<style>
</style>
