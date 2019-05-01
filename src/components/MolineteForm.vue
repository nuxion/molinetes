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
            <label for="idMolinete">Id</label>
            <input
              v-model="formData.id"
              type="text"
              class="form-control"
              id="idMolinete"
              disabled
            />
            <label for="eventoCod">Event</label>
            <input
              v-model="formData.evento_cod"
              type="text"
              class="form-control"
              id="eventoCod"
              placeholder="Codigo del evento"
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
  name: "MolineteForm",
  data() {
    return {
      formData: {
        id: null,
        evento_cod: ""
      }
    };
  },
  props: {
    molinete: Object
  },
    methods: {
    
    },
  beforeMount: function() {
    if (this.molinete) {
      this.formData.id = this.molinete.id;
      this.formData.evento_cod = this.molinete.evento;
    }
  }
};
</script>
