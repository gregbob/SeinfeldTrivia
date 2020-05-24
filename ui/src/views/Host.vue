<template>
  <div id="host">
    <ul>
      <li v-for="item in items" :key="item.message">
        {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Host',
    computed: {
    ...mapState(['items'])
  },
}
</script>

<style>
</style>
