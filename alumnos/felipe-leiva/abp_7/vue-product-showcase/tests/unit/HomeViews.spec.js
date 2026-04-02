import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("muestra mensaje de error cuando el store tiene error", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              productos: {
                lista: [],
                cargando: false,
                error: "Error de red",
                categorias: [],
                categoriaActual: "todas",
                productosFiltrados: [],
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(".estado-error").exists()).toBe(true);
    expect(wrapper.text()).toContain("Error de red");
  });

  it("muestra spinner cuando cargando es true", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              productos: {
                lista: [],
                cargando: true,
                error: null,
                categorias: [],
                categoriaActual: "todas",
                productosFiltrados: [],
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(".spinner").exists()).toBe(true);
  });
});
