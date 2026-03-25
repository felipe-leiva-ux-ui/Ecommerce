<script setup>
import { ref, computed, onMounted } from "vue";
import ProductList from "../components/products/ProductList.vue";
import { productosService } from "../services/productosService";

// Aqui guardamos los productos traidos desde la API.
const productos = ref([]);

// Aqui guardamos las categorias para llenar el select.
const categorias = ref([]);

// El valor por defecto muestra todos los productos.
const categoriaSeleccionada = ref("todas");

// Controla el estado de carga mientras la API responde.
const cargando = ref(false);

// Si ocurre un problema, mostramos un mensaje amigable al usuario.
const error = ref(null);

// Computed significa: este valor se recalcula automaticamente
// cuando cambian sus dependencias.
// Filtramos en memoria porque ya cargamos toda la lista al inicio.
const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === "todas") {
    return productos.value;
  }

  return productos.value.filter((producto) => producto.category === categoriaSeleccionada.value);
});

// Esta funcion carga productos y categorias al entrar a la vista.
async function cargarProductos() {
  cargando.value = true;
  error.value = null;

  try {
    // Promise.all permite pedir ambos recursos al mismo tiempo.
    // Esto mejora el tiempo de carga frente a hacer una petición y luego otra.
    const [productosApi, categoriasApi] = await Promise.all([
      productosService.getAll(),
      productosService.getCategorias(),
    ]);

    productos.value = productosApi;
    categorias.value = categoriasApi;
  } catch (err) {
    console.error("Error al cargar datos desde la API:", err);
    error.value = "No se pudieron cargar los productos. Intenta nuevamente.";
  } finally {
    // finally siempre se ejecuta, haya error o no.
    cargando.value = false;
  }
}

function filtrar() {
  // No necesitamos lógica extra aquí porque la computed
  // productosFiltrados responde automáticamente al cambio del select.
  console.log("Categoria seleccionada:", categoriaSeleccionada.value);
}

function onAgregar(producto) {
  alert(`"${producto.title}" agregado al carrito`);
}

// onMounted ejecuta la carga inicial cuando la vista ya está montada.
onMounted(cargarProductos);
</script>

<template>
  <main class="home">
    <section class="filtros">
      <label for="categoria" class="filtros-label">Filtrar por categoría</label>
      <select
        id="categoria"
        v-model="categoriaSeleccionada"
        @change="filtrar"
        data-cy="filtro-categoria"
      >
        <option value="todas">Todas las categorías</option>
        <option v-for="categoria in categorias" :key="categoria" :value="categoria">
          {{ categoria }}
        </option>
      </select>
    </section>

    <section v-if="cargando" class="estado estado-carga">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </section>

    <section v-else-if="error" class="estado estado-error">
      <p>{{ error }}</p>
      <button @click="cargarProductos" class="boton-reintentar">Reintentar</button>
    </section>

    <section v-else-if="productosFiltrados.length === 0" class="estado estado-vacio">
      <p>No se encontraron productos para esta categoría.</p>
    </section>

    <ProductList v-else :productos="productosFiltrados" @agregar="onAgregar" />
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
