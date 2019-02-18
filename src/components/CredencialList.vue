<template>
    <div class="Credencial">
        <table>
            <tr>
                <th>Nombre</th>
                <th>Evento</th>
                <th>Molinete</th>
                <th>Accion</th>
            </tr>
            <tr v-for="cred of credenciales" v-bind:item="cred" v-bind:key="cred.id">
                <th>{{ cred.nombre }}</th>
                <th>{{ cred.evento }}</th>
                <th>{{ cred.molinete }}</th>
                <th>edit | del </th>
            </tr>
        </table>
  </div>
</template>

<script>
export default {
    name: 'CredencialList',
    data () { return {
        uri: this.globalCFG.apiserver,
        credenciales: {},
    } },
  props: {
    msg: String
  },
    methods:{
        getCredenciales: function(){
            const uri = this.globalCFG.apiserver + '/credenciales';
            fetch(uri).then((res) => res.json())
                .then((data) => this.credenciales = data)
        }
    },
    beforeMount: function (){
        this.getCredenciales();
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
