<script setup>
import { ref } from 'vue';

defineOptions({ name: 'FiltroPanel' });

const soloDisponibles = ref(false);
const precioMax = ref(2500);
</script>

<template>
  <div>
    <h2>Panel de Filtros</h2>
    <label>
      <input type="checkbox" v-model="soloDisponibles" />
      Solo Disponibles
    </label>
    <br />
    <label>
      Precio Máximo: ${{ precioMax }}
      <input type="range" v-model="precioMax" min="0" max="5000" step="100" />
      <p style="color: grey; font-size: 12px">
        Estos filtros se preservan al cambiar de tab gracias a Keep-alive
      </p>
    </label>
  </div>
</template>
