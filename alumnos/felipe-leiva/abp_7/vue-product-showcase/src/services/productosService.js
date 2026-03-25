import api from "./api";

// Este servicio agrupa todas las operaciones relacionadas con productos.
// La idea es que la vista no se preocupe de URLs ni detalles HTTP.
export const productosService = {
  async getAll() {
    const { data } = await api.get("/products");
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async getCategorias() {
    const { data } = await api.get("/products/categories");
    return data;
  },

  async getByCategoria(categoria) {
    const { data } = await api.get(`/products/category/${categoria}`);
    return data;
  },
};
