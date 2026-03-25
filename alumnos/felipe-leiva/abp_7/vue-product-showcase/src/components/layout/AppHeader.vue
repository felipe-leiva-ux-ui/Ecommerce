<script setup>
// Sin lógica por ahora
import logo from "../../assets/img/logo-tecnoshoop.svg";
</script>

<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="container">
      <img :src="logo" alt="Logo Tecnoshoop" />
      <h1>Vue Product Showcase</h1>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
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
</style>
