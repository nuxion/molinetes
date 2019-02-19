<template>
  <div class="container">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-10">
        <!--
            <p>Credencial data: {{ credencialData }}</p>
            -->
        <h1>ABM Credenciales</h1>
      </div>
    </div>
    <div v-if="showlist" class="row justify-content-center text-center mb-5">
      <div class="col-10">
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="createCredencial"
        >
          Crear credencial
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <ResourceList
          v-show="showlist"
          v-bind:items="credencialesResponse"
          v-bind:head="headers"
          v-on:deleteResource="deleteCredencial($event)"
          v-on:editResource="editCredencial($event)"
        />
        <CredencialForm
          v-if="showform"
          v-on:saveForm="saveCredencial($event)"
          v-on:cancelForm="closeForm()"
          v-bind:credencial="credencialData"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import CredencialList from '@/components/CredencialList.vue'
import ResourceList from "@/components/ResourceList.vue";
import CredencialForm from "@/components/CredencialForm.vue";

export default {
  name: "credenciales",
  components: {
    //CredencialList,
    ResourceList,
    CredencialForm
  },
  data() {
    return {
      credencialesResponse: {},
      headers: [],
      showlist: true,
      showform: false,
      credencialData: null
    };
  },
  methods: {
    deleteTest: function(event) {
      console.log("EVENT: " + event);
    },
    getCredenciales: function() {
      /**
       * getCredentials from REST api and set headers
       */
      const uri = this.globalCFG.apiserver + "/credenciales";
      fetch(uri)
        .then(res => res.json())
        .then(data => (this.credencialesResponse = data))
        .then(data => {
          this.headers = Object.keys(data[0]);
          this.headers.push("Actions");
        });
    },
    saveCredencial: function(event) {
      if (event.id) {
        // update resource
        this.putCredencial(event);
      } else {
        this.postCredencial(event);
      }
    },
    postCredencial: function(credencial) {
      // create credencial
      const data = {
        nombre: credencial.nombre,
        molinete_id: credencial.molinete,
        evento_cod: credencial.evento
      };
      const uri = this.globalCFG.apiserver + "/credenciales";

      fetch(uri, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getCredenciales();
        this.showlist = true;
        this.showform = false;
      });
    },
    putCredencial: function(credencial) {
      // update credencial
      const data = {
        nombre: credencial.nombre,
        molinete_id: credencial.molinete,
        evento_cod: credencial.evento
      };
      const uri = this.globalCFG.apiserver + "/credenciales/" + credencial.id;

      fetch(uri, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getCredenciales();
        this.showlist = true;
        this.showform = false;
      });
    },

    createCredencial: function(event) {
      this.showlist = false;
      this.showform = true;
      console.log(event);
    },
    editCredencial: function(event) {
      this.showlist = false;
      this.showform = true;
      this.credencialData = event;
    },
    deleteCredencial: function(event) {
      const uri = this.globalCFG.apiserver + "/credenciales/";
      fetch(uri + event, { method: "delete" }).then(res => {
        if (res.status === 200) {
          console.log("Deleted");
          this.getCredenciales();
        }
      });
    },
    closeForm: function() {
      this.showform = false;
      this.showlist = true;
    }
  },
  beforeMount: function() {
    this.getCredenciales();
    console.log(this.credencialesResponse[0]);
    console.log("BeforeMount Credenciales.vue");
  }
};
</script>
