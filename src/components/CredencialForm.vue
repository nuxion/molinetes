<template>
    <div class="container">
			<div class="row justify-concent-center mb-5">
				<div class="col-10">
					{{ formData }}
					<p>
						credencial:
						{{ credencial }}
					</p>
					<form>
				  	<div class="form-group">
							<label for="nombreCredencial">Nombre</label>
							<input v-model="formData.nombre" type="text" class="form-control" id="nombreCredencial" placeholder="Nombre del titular de la credencial">
							<label for="eventosList">Evento</label>
							<select class="form-control" v-model="eventSelect">
								<option disabled value="">Seleccione un Evento</option>
								<option v-for="ev of eventos" 
									v-bind:key="ev.id" :value="ev.cod">{{ ev.nombre }}</option>
							</select>
							<div class="form-group" v-show="showMolinetes">
								<label for="eventosList">Molinete</label>
								<select class="form-control" v-model="formData.molinete">
									<option disabled value="">Seleccione un molinete</option>
									<option v-for="mol of molinetes" 
										v-bind:key="mol.id" :value="mol.id">{{ mol.id }}</option>
								</select>
							</div>

				  	</div>
					</form>
				</div>
			</div>
			<div class="row justify-content-center text-center">
				<div class="col-2">
					<button type="button" class="btn btn-primary"
						v-on:click="$emit('saveForm', formData)">
						Agregar
					</button><span/>
				</div>
				<div class="col-2">
					<button type="button" class="btn btn-danger" 
						v-on:click="$emit('cancelForm')">
						Cancelar
					</button>
					
				</div>
			</div>
    </div>
</template>

<script>
export default {
	name: 'CredencialForm',
	data() { return {
		formData: {
			nombre: "",
			evento: "",
			molinete: ""
		},
		eventSelect: "",
		eventos: [],
		molinetes: [],
		showMolinetes: false
	} },
  props: {
      credencial: Object,
	},
	methods: {
		getEventos: function(){
			const uri = this.globalCFG.apiserver + '/eventos';
			fetch(uri).then((res) => res.json())
				.then((data) => this.eventos = data)
		}
		
	},
	beforeMount: function(){
		if (this.credencial){
			this.formData.nombre = this.credencial.nombre;
			this.eventSelect = this.credencial.evento_cod
		}
		this.getEventos();
	},
	watch: {
		eventSelect: function(){
			this.formData.evento = this.eventSelect;
			var self = this;
			this.eventos.forEach((e)=>{
				if (e.cod == self.eventSelect){
					self.showMolinetes = true;
					self.molinetes = e.molinetes;
				}
				});

			}
		}


	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
