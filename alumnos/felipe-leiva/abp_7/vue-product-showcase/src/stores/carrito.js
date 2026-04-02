import { defineStore } from "pinia";
export const useCarritoStore = defineStore("carrito", {
  state: () => ({
    lista: JSON.parse(localStorage.getItem("carrito") || "[]"),
  }),

  getters: {
    enCarrito: (state) => (id) => state.lista.some((p) => p.id === id),
    total: (state) => state.lista.length,
    totalPrecio: (state) => state.lista.reduce((ac, p) => ac + p.price * p.cantidad, 0),
  },

  actions: {
    agregar(producto) {
      const idx = this.lista.findIndex((p) => p.id === producto.id);
      if (idx >= 0) {
        this.lista[idx].cantidad++;
      } else {
        this.lista.push({ ...producto, cantidad: 1 });
      }
      this._actualizarLocalStorage();
    },

    quitar() {
      const idx = this.lista.findIndex((p) => p.id === producto.id);
      if (idx < 0) return;
      if (this.lista[idx].cantidad > 1) {
        this.lista[idx].cantidad--;
      } else {
        this.lista.splice(idx, 1);
      }
      this._actualizarLocalStorage();
    },

    Limpiar() {
      this.lista = [];
      localStorage.removeItem("carrito");
    },

    _actualizarLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(this.lista));
    },
  },
});
