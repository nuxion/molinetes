<template>
  <div class="container">
    <div class="row justify-concent-center mb-5">
      <div class="col-10">
        {{ formData }}
        <p>
          Credential:
          {{ credencial }}
        </p>
        <form>
          <div class="form-group">
            <label for="nombreEvento">Name</label>
            <input
              v-model="formData.nombre"
              type="text"
              class="form-control"
              id="nombreEvento"
              placeholder="Event name"
            />
            <label for="codigoEvento">Code</label>
            <input
              v-model="formData.cod"
              type="text"
              class="form-control"
              id="codigoCredencial"
              placeholder="Event code"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-2">
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="$emit('saveForm', formData)"
        >
          Save</button
        ><span />
      </div>
      <div class="col-2">
        <button
          type="button"
          class="btn btn-danger"
          v-on:click="$emit('cancelForm')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventoForm",
  data() {
    return {
      formData: {
        id: null,
        nombre: "",
        cod: ""
      }
    };
  },
  props: {
    evento: Object
  },
  methods: {},
  beforeMount: function() {
    if (this.evento) {
      this.formData.nombre = this.evento.nombre;
      this.formData.id = this.evento.id;
      this.formData.cod = this.evento.codigo;
    }
  }
};
</script>
