<template>
    <div class="container">
			<div class="row">
        <table class="table">
					<tr>
						<th v-for="h of head" v-bind:h="h" v-bind:key="h">{{ h  }}</th>
           </tr>
					 <tr v-for="item of items" v-bind:item="item" v-bind:key="item.id">
						 <th v-for="i of item" v-bind:i="i" v-bind:key="i">
							 {{ i  }}
							</th>
							<th><button type="button" v-on:click="$emit('editResource', item)" class="btn btn-primary">Edit</button>
							<button type="button" v-on:click="$emit('deleteResource', item.id)" class="btn btn-danger">Borrar</button> </th>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
	name: 'ResourceList',
	data () { return {
		headers: []
	} }, 
  props: {
      head: Array,
      items: Object
	},
	methods: { 
		setHeaders(){
			//this.headers = Object.keys(this.items[0]);
			//this.headers.push('Actions');

		}
	},
	beforeMount: function(){
		this.setHeaders();
		console.log(this.head);
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
