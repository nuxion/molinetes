<template>
    <div class="container">
      <div class="row">
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Event</th>
                <th>Turnstile</th>
                <th>Action</th>
            </tr>
            <tr v-for="cred of credenciales" v-bind:item="cred" v-bind:key="cred.id">
                <th>{{ cred.nombre }}</th>
                <th>{{ cred.evento }}</th>
                <th>{{ cred.molinete }}</th>
                <th><button type="button" class="btn btn-primary">Edit</button><button type="button" class="btn btn-danger">Delete</button> </th>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CredencialList',
  props: {
      msg: String,
      credenciales: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
