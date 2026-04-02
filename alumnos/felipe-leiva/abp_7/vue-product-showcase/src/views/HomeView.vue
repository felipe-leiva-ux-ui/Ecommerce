<script setup>
import { onMounted } from "vue";
import ProductList from "../components/products/ProductList.vue";
import { useProductosStore } from "../stores/productos";

const productosStore = useProductosStore();

// La vista ahora solo consume estado centralizado.
// La lógica de negocio y las llamadas a API viven en la store.
onMounted(() => {
  productosStore.fetchProductos();
});

function onAgregar(producto) {
  alert(`"${producto.title}" agregado al carrito`);
}
</script>

<template>
  <main class="home">
    <section class="filtros">
      <label for="categoria" class="filtros-label">Filtrar por categoría</label>
      <select
        id="categoria"
        :value="productosStore.categoriaActual"
        @change="productosStore.cambiarCategoria($event.target.value)"
        data-cy="filtro-categoria"
      >
        <option value="todas">Todas las categorías</option>
        <option v-for="categoria in productosStore.categorias" :key="categoria" :value="categoria">
          {{ categoria }}
        </option>
      </select>
    </section>

    <section v-if="productosStore.cargando" class="estado estado-carga">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </section>

    <section v-else-if="productosStore.error" class="estado estado-error">
      <p>{{ productosStore.error }}</p>
      <button @click="productosStore.fetchProductos()" class="boton-reintentar">Reintentar</button>
    </section>

    <section v-else-if="productosStore.productosFiltrados.length === 0" class="estado estado-vacio">
      <p>No se encontraron productos para esta categoría.</p>
    </section>

    <ProductList v-else :productos="productosStore.productosFiltrados" @agregar="onAgregar" />
  </main>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.filtros {
  margin-bottom: 1.5rem;
}

.filtros-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.filtros select {
  min-width: 260px;
  padding: 0.7rem 0.9rem;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.estado {
  text-align: center;
  padding: 3rem 1rem;
}

.estado-carga,
.estado-vacio {
  color: #555;
}

.estado-error {
  color: #b00020;
}

.boton-reintentar {
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.spinner {
  width: 42px;
  height: 42px;
  margin: 0 auto 1rem;
  border: 4px solid #e9e9e9;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
