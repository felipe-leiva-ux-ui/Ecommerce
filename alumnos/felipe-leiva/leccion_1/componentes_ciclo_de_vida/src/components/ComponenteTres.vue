<script setup>
/* const props = defineProps(['mensaje', 'cambiarMensaje']); */

/* metodo provide a inject */

/* import { inject } from 'vue';
const mensaje = inject('mensaje');
const cambiarMensaje = inject('cambiarMensaje'); */

import { useMensajeStore } from '../stores/mensajeStore';
const store = useMensajeStore();
</script>

<template>
  <div class="container">
    <h3>Componente 3</h3>
    <p>{{ store.mensaje }}</p>
    <button @click="store.cambiarMensaje()">Cambiar Mensaje</button>
  </div>
</template>

<style scoped></style>
