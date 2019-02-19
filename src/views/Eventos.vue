<template>
  <div class="container">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-10">
        <!--
            <p>Evento data: {{ credencialData }}</p>
            -->
        <h1>ABM Eventos</h1>
      </div>
    </div>
    <div v-if="showlist" class="row justify-content-center text-center mb-5">
      <div class="col-10">
        <button type="button" class="btn btn-primary" v-on:click="createEvento">
          Crear evento
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <ResourceList
          v-show="showlist"
          v-bind:items="eventosList"
          v-bind:head="headers"
          v-on:deleteResource="deleteEvento($event)"
          v-on:editResource="editEvento($event)"
        />
        <EventoForm
          v-if="showform"
          v-on:saveForm="saveEvento($event)"
          v-on:cancelForm="closeForm()"
          v-bind:evento="eventoData"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import EventoList from '@/components/EventoList.vue'
import ResourceList from "@/components/ResourceList.vue";
import EventoForm from "@/components/EventoForm.vue";

export default {
  name: "eventos",
  components: {
    //EventoList,
    ResourceList,
    EventoForm
  },
  data() {
    return {
      eventosResponse: {},
      headers: [],
      showlist: true,
      showform: false,
      eventoData: null,
      eventosList: []
    };
  },
  methods: {
    deleteTest: function(event) {
      console.log("EVENT: " + event);
    },
    getEventos: function() {
      /**
       * getCredentials from REST api and set headers
       */
      const uri = this.globalCFG.apiserver + "/eventos";
      const self = this;
      fetch(uri)
        .then(res => res.json())
        .then(data => (this.eventosResponse = data))
        .then(data => {
          self.eventosList = [];
          self.transformEventos(data);

          self.headers = Object.keys(this.eventosList[0]);
          self.headers.push("Actions");
        });
    },
    transformEventos(data) {
      data.forEach(d => {
        this.eventosList.push({
          id: d.id,
          codigo: d.cod,
          nombre: d.nombre
        });
      });
    },
    saveEvento: function(event) {
      if (event.id) {
        // update resource
        this.putEvento(event);
      } else {
        this.postEvento(event);
      }
    },
    postEvento: function(evento) {
      // create credencial
      const data = {
        nombre: evento.nombre,
        cod: evento.cod
      };
      const uri = this.globalCFG.apiserver + "/eventos";

      fetch(uri, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getEventos();
        this.showlist = true;
        this.showform = false;
      });
    },
    putEvento: function(evento) {
      // update credencial
      const data = {
        nombre: evento.nombre,
        cod: evento.cod
      };
      const uri = this.globalCFG.apiserver + "/eventos/" + evento.id;

      fetch(uri, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(() => {
        this.getEventos();
        this.showlist = true;
        this.showform = false;
      });
    },

    createEvento: function(event) {
      this.showlist = false;
      this.showform = true;
      console.log(event);
    },
    editEvento: function(event) {
      this.showlist = false;
      this.showform = true;
      this.eventoData = event;
    },
    deleteEvento: function(event) {
      const uri = this.globalCFG.apiserver + "/eventos/";
      fetch(uri + event, { method: "delete" }).then(res => {
        if (res.status === 200) {
          console.log("Deleted");
          this.getEventos();
        }
      });
    },
    closeForm: function() {
      this.showform = false;
      this.showlist = true;
    }
  },
  beforeMount: function() {
    this.getEventos();
  }
};
</script>
