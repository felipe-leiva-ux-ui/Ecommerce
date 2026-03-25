import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", () => {
  const lista = ref(JSON.parse(localStorage.getItem("favoritos")) || []);

  function guardarEnLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(lista.value));
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
