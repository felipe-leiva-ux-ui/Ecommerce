import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeView from "../../views/HomeView.vue";
import { productosService } from "../../services/productosService";

/* vi.mock() reemplaza el servicio real por uno simulado, evitando llamadas reales a la API,sí la prueba no depende de internet. */
/* flushPromises() espera a que termine el trabajo asíncrono, asi validamos el comportamiento visible, no detalles internos. */

vi.mock("../../services/productosService", () => ({
  productosService: {
    getAll: vi.fn(),
    getCategorias: vi.fn(),
  },
}));

describe("HomeView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("muestra mensaje de error cuando falla la API", async () => {
    productosService.getAll.mockRejectedValue(new Error("Error de red"));
    productosService.getCategorias.mockRejectedValue(new Error("Error de red"));

    const wrapper = mount(HomeView);

    await flushPromises();

    expect(wrapper.find(".estado-error").exists()).toBe(true);
    expect(wrapper.text()).toContain("No se pudieron cargar los productos.");
  });
});
