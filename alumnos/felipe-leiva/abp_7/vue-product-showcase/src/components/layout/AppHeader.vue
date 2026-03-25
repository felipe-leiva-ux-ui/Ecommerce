<script setup>
import logo from "../../assets/img/logo-tecnoshoop.svg";
import { useFavoritosStore } from "../../stores/favoritos";

const favoritosStore = useFavoritosStore();
</script>

<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="container">
      <img :src="logo" class="logo-nav" alt="Logo Tecnoshoop" />
      <h1>Vue Product Showcase</h1>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <span class="favoritos-badge">Favoritos: {{ favoritosStore.totalFavoritos }}</span>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #2c2c2c;
  color: white;
  padding: 1rem 2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.favoritos-badge {
  margin-left: 1rem;
  font-weight: bold;
  color: #42b883;
}

.logo-nav {
  height: 40px;
}
</style>
