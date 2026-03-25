<script setup>
import ComponenteDos from './ComponenteDos.vue';

/* defineProps(['mensaje', 'cambiarMensaje']); */
</script>
<template>
  <div class="container">
    <h1>Componente 1</h1>
    <ComponenteDos />
  </div>
</template>

<style scoped>
.container {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
</style>
