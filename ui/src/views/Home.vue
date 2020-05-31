<template>
  <div id="home">
    <b-card class="m-2"> 
      <b-tabs>
        <b-tab title="Join">
          <join-form class="form"></join-form>
        </b-tab>
        <b-tab title="Host">
          <host-form class="form"></host-form>
        </b-tab>
      </b-tabs>
    </b-card>



  </div>
</template>

<script>
import JoinForm from '../components/JoinForm';
import HostForm from '../components/HostForm';

export default {
  name: 'Home',
  components: {
    JoinForm,
    HostForm,
  }
}
</script>

<style>

.form {
  margin: 1em;
}
</style>
