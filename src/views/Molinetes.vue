<template>
  <div class="container">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-10">
        <!--
            <p>Molinete data: {{ credencialData }}</p>
            -->
        <h1>ABM Molinetes</h1>
      </div>
    </div>
    <div v-if="showlist" class="row justify-content-center text-center mb-5">
      <div class="col-10">
        <button type="button" class="btn btn-primary" v-on:click="createMolinete">
          Create turnstile 
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <ResourceList
          v-show="showlist"
          v-bind:items="molinetesList"
          v-bind:head="headers"
          v-on:deleteResource="deleteMolinete($event)"
          v-on:editResource="editMolinete($event)"
        />
        <MolineteForm
          v-if="showform"
          v-on:saveForm="saveMolinete($event)"
          v-on:cancelForm="closeForm()"
          v-bind:molinete="molineteData"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import MolineteList from '@/components/MolineteList.vue'
import ResourceList from "@/components/ResourceList.vue";
import MolineteForm from "@/components/MolineteForm.vue";

export default {
  name: "molinetes",
  components: {
    //MolineteList,
    ResourceList,
    MolineteForm
  },
  data() {
    return {
      molinetesResponse: {},
      headers: [],
      showlist: true,
      showform: false,
      molineteData: null,
      molinetesList: []
    };
  },
  methods: {
    deleteTest: function(event) {
      console.log("EVENT: " + event);
    },
    getMolinetes: function() {
      /**
       * getCredentials from REST api and set headers
       */
      const uri = this.globalCFG.apiserver + "/molinetes";
      const self = this;
      fetch(uri)
        .then(res => res.json())
        .then(data => (this.molinetesResponse = data))
        .then(data => {
          self.molinetesList = [];
          self.transformMolinetes(data);

          self.headers = Object.keys(this.molinetesList[0]);
          self.headers.push("Actions");
        });
    },
    transformMolinetes(data) {
      data.forEach(d => {
        this.molinetesList.push({
          id: d.id,
          evento: d.evento_cod
        });
      });
    },
    saveMolinete: function(event) {
      if (event.id) {
        // update resource
        this.putMolinete(event);
      } else {
        this.postMolinete(event);
      }
    },
    postMolinete: function(evento) {
      // create credencial
      const data = {
        evento_cod: evento.evento_cod
      };
      const uri = this.globalCFG.apiserver + "/molinetes";

      fetch(uri, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getMolinetes();
        this.showlist = true;
        this.showform = false;
      });
    },
    putMolinete: function(evento) {
      // update credencial
      const data = {
        evento_cod: evento.evento_cod,
      };
      const uri = this.globalCFG.apiserver + "/molinetes/" + evento.id;

      fetch(uri, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getMolinetes();
        this.showlist = true;
        this.showform = false;
      });
    },

    createMolinete: function(event) {
      this.showlist = false;
        this.showform = true;
        this.molineteData = null;
      console.log(event);
    },
    editMolinete: function(event) {
      this.showlist = false;
      this.showform = true;
      this.molineteData = event;
    },
    deleteMolinete: function(event) {
      const uri = this.globalCFG.apiserver + "/molinetes/";
      fetch(uri + event, { method: "delete" }).then(res => {
        if (res.status === 200) {
          console.log("Deleted");
          this.getMolinetes();
        }
      });
    },
    closeForm: function() {
      this.showform = false;
      this.showlist = true;
      this.molineteData = null;
    }
  },
  beforeMount: function() {
    this.getMolinetes();
  }
};
</script>
