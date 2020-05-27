<template>
  <div id="home">
    <b-tabs content-class="mt-3">
      <b-tab title="Host">
        <router-link to="/host">Go to Host</router-link>
      </b-tab>
      <b-tab title="Join">
        <join-form></join-form>
      </b-tab>
    </b-tabs>


  </div>
</template>

<script>
import JoinForm from '../components/JoinForm';

export default {
  name: 'Home',
  components: {
    JoinForm,
  }
}
</script>

<style>
</style>
