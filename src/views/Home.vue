<template>
  <div class="home">
    <!--img alt="Vue logo" src="../assets/logo.png"-->
    <HelloWorld msg="Welcome to Turnstile application"/>
    <h5>This is a example application. Its comunicates with a backend to perform ABM Actions.</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
