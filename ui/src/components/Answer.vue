<template>
  <div id="answer">
    User: {{ user.name }}, Answer: {{ user.currentAnswer }}
    <input type="checkbox" v-model="user.validAnswer">
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    user: Object
  }
}
</script>

<style>
</style>
