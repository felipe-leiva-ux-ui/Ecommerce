<!-- 1. Prop Driling (el problema) -->
<!-- Componentes intermedios no estan usando nada, solo estan pasando "componente 1 y 2" -->
<script setup>
import { ref } from 'vue';
import MyLayout from './layout/MyLayout.vue';
import ProductList from './components/ProductList.vue';
import FiltrosPanel from './components/FiltrosPanel.vue';
import router from './router';

const tabActual = ref('ProductList');
const tabs = { ProductList, FiltrosPanel };

/* import { ref, provide } from 'vue';
import ComponenteUno from './components/ComponenteUno.vue';
import ComponenteTres from './components/ComponenteTres.vue'; */

/* const mensaje = ref('Hola desde App.vue');
function cambiarMensaje() {
  mensaje.value = 'Mensaje actualizado desde ComponenteTres.vue';
} */

/* metodo provide */
/* provide('mensaje', mensaje);
provide('cambiarMensaje', cambiarMensaje); */

/* metodo  */
</script>

<template>
  <MyLayout>
    <template #header>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/producto/1">Producto 1</RouterLink>
    </template>

    <hr />
    <h3>Demo Keep-alive</h3>
    <!-- Botones para cambiar el tab -->
    <button @click="tabActual = 'ProductList'">lista de productos</button>
    <button @click="tabActual = 'FiltrosPanel'">Filtros</button>
    <!-- component :is="tabActual" renderisa dinamicamente el componente cuyo nombre coincide con el string en tabActual -->
    <KeepAlive :include="['ProductList', 'FiltrosPanel']" :max="5">
      <component :is="tabs[tabActual]" />
    </KeepAlive>
    <hr />
    <router-view />
    <template #footer>@ 2026</template>
  </MyLayout>
</template>

<style scoped></style>
