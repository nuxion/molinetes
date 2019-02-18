<template>
  <div class="credenciales">
      <h1>ABM Credenciales</h1>
      <CredencialList/>
  </div>
</template>

<script>
import CredencialList from '@/components/CredencialList.vue'

export default {
    name: 'credenciales',
    components: {
        CredencialList
    }
}
</script>
