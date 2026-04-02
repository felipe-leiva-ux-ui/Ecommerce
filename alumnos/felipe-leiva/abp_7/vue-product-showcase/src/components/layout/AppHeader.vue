<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import logo from "../../assets/img/logo-tecnoshoop.svg";
import { useFavoritosStore } from "../../stores/favoritos";
import { useCarritoStore } from "../../stores/carrito";

const carritoStore = useCarritoStore();
const favoritosStore = useFavoritosStore();
const theme = useTheme();
const temaOscuro = ref(false);

function toggleTema(valor) {
  theme.global.name.value = valor ? "dark" : "light";
}
</script>

<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="d-flex align-center ga-3">
      <img :src="logo" class="logo-nav" alt="Logo Tecnoshoop" />
      <span>Vue Product Showcase</span>
    </v-app-bar-title>

    <RouterLink to="/" class="nav-link">Inicio</RouterLink>

    <span class="favoritos-badge"> Favoritos: {{ favoritosStore.totalFavoritos }} </span>

    <v-btn v-if="favoritosStore.totalFavoritos > 0" variant="text" icon="mdi-heart" color="white" />

    <!-- Botón carrito (solo si hay al menos 1) -->
    <v-btn
      v-if="carritoStore.total > 0"
      to="/carrito"
      variant="text"
      color="white"
      class="mr-1"
      prepend-icon="mdi-cart"
    >
      Carrito
      <v-badge
        :content="carritoStore.total"
        color="white"
        text-color="primary"
        inline
        class="ml-1"
      />
    </v-btn>

    <div class="theme-toggle-wrapper">
      <v-switch
        v-model="temaOscuro"
        inset
        hide-details
        class="theme-switch ml-4"
        color="black"
        false-icon="mdi-white-balance-sunny"
        true-icon="mdi-weather-night"
        @update:model-value="toggleTema"
      />
      <span class="theme-label">
        {{ temaOscuro ? "Tema Oscuro" : "Tema Claro" }}
      </span>
    </div>
  </v-app-bar>
</template>

<style scoped>
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  margin-right: 1rem;
}

.favoritos-badge {
  margin-left: 1rem;
  font-weight: bold;
  color: white;
}

.logo-nav {
  height: 40px;
  width: auto;
  display: block;
}

/* === toggles dark mode ===*/

.theme-switch {
  display: flex;
  align-items: center;
}

:deep(.theme-switch .v-selection-control) {
  min-height: auto;
}

:deep(.theme-switch .v-switch__track) {
  border-radius: 999px;
  opacity: 1;
  background-color: #ffffff;
  border: 1px solid #d7d7d7;
}

:deep(.theme-switch .v-switch__thumb) {
  box-shadow: none;
}

:deep(.theme-switch .v-selection-control--dirty .v-switch__track) {
  border-color: #2f3133;
}

:deep(.theme-switch .v-selection-control--dirty .v-switch__thumb) {
  color: #ffffff;
}

:deep(.theme-switch .mdi) {
  font-size: 20px;
}

.theme-toggle-wrapper {
  display: flex;
  align-items: center;
}

.theme-label {
  margin-left: 0.5rem;
  color: white;
  font-weight: 600;
}
</style>
