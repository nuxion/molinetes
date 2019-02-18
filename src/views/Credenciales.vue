<template>
  <div class="credenciales">
      <h1>ABM Credenciales</h1>
      <CredencialList v-bind:credenciales='credencialesResponse'/>
  </div>
</template>

<script>
import CredencialList from '@/components/CredencialList.vue'

export default {
    name: 'credenciales',
    components: {
        CredencialList
    },
    data () { return {
        credencialesResponse: {},
    } },
    methods:{
        getCredenciales: function(){
            const uri = this.globalCFG.apiserver + '/credenciales';
            fetch(uri).then((res) => res.json())
                .then((data) => this.credencialesResponse = data)
        }
    },
    beforeMount: function (){
        this.getCredenciales();
        
    }
}
</script>
