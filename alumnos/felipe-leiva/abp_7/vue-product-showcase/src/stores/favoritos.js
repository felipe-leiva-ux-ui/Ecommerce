import { computed, ref } from "vue";
import { defineStore } from "pinia";

function obtenerFavoritosIniciales() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  const favoritosGuardados = window.localStorage.getItem("favoritos");
  return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
}

export const useFavoritosStore = defineStore("favoritos", () => {
  const lista = ref(obtenerFavoritosIniciales());

  function guardarEnLocalStorage() {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }

    window.localStorage.setItem("favoritos", JSON.stringify(lista.value));
  }

  function toggleFavorito(producto) {
    const existe = lista.value.find((item) => item.id === producto.id);

    if (existe) {
      lista.value = lista.value.filter((item) => item.id !== producto.id);
    } else {
      lista.value.push(producto);
    }

    guardarEnLocalStorage();
  }

  function esFavorito(id) {
    return lista.value.some((producto) => producto.id === id);
  }

  const totalFavoritos = computed(() => lista.value.length);

  return {
    lista,
    totalFavoritos,
    toggleFavorito,
    esFavorito,
  };
});
