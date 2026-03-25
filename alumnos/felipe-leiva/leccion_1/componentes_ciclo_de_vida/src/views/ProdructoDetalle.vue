<script setup>
import { mergeProps, onMounted } from 'vue';

const props = defineProps({ id: String });

onMounted(() => console.log('productoDetalle montado, id:', props.id));
</script>

<template>
  <div>
    <h1>Producto {{ props.id }}</h1>
    <p>Detalle cargado desde su propio chunk Js.</p>
  </div>
</template>

<style scoped></style>
