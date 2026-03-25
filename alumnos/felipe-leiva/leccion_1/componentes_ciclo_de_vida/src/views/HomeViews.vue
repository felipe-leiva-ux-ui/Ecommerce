<script setup>
import { onMounted } from 'vue';
onMounted(() => console.log('HomeViews montado'));
</script>

<template>
  <div>
    <h1>Inicio</h1>
    <p>esta vista se cargo como chunk separado</p>
    <RouterLink to="/producto/42"></RouterLink>
  </div>
</template>

<style scoped></style>
