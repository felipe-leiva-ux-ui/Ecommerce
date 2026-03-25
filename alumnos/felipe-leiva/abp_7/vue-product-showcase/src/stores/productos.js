import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { productosService } from "../services/productosService";

export const useProductosStore = defineStore("productos", () => {
  const lista = ref([]);
  const categorias = ref([]);
  const categoriaActual = ref("todas");
  const cargando = ref(false);
  const error = ref(null);

  // Este getter devuelve la lista filtrada según la categoría seleccionada.
  const productosFiltrados = computed(() => {
    if (categoriaActual.value === "todas") {
      return lista.value;
    }

    return lista.value.filter((producto) => producto.category === categoriaActual.value);
  });

  const totalProductos = computed(() => lista.value.length);

  async function fetchProductos() {
    cargando.value = true;
    error.value = null;

    try {
      const [productosApi, categoriasApi] = await Promise.all([
        productosService.getAll(),
        productosService.getCategorias(),
      ]);

      lista.value = productosApi;
      categorias.value = categoriasApi;
    } catch (err) {
      console.error("Error al cargar productos desde la store:", err);
      error.value = "No se pudieron cargar los productos.";
    } finally {
      cargando.value = false;
    }
  }

  function cambiarCategoria(categoria) {
    categoriaActual.value = categoria;
  }

  return {
    lista,
    categorias,
    categoriaActual,
    cargando,
    error,
    productosFiltrados,
    totalProductos,
    fetchProductos,
    cambiarCategoria,
  };
});
