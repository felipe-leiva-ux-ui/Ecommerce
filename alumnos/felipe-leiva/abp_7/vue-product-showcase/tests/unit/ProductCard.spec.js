import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import ProductCard from "@/components/products/ProductCard.vue";

const mockProducto = {
  id: 1,
  title: "Laptop Gaming",
  price: 999,
  category: "electronics",
  image: "test.jpg",
};

describe("ProductCard", () => {
  it("renderiza nombre, precio y categoría", () => {
    const wrapper = mount(ProductCard, {
      props: { producto: mockProducto },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.text()).toContain("Laptop Gaming");
    expect(wrapper.text()).toContain("999");
    expect(wrapper.text()).toContain("electronics");
  });

  it('emite "agregar" al hacer click en el botón del carrito', async () => {
    const wrapper = mount(ProductCard, {
      props: { producto: mockProducto },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper.find("[data-cy=btn-agregar]").trigger("click");

    expect(wrapper.emitted("agregar")).toBeTruthy();
    expect(wrapper.emitted("agregar")[0]).toEqual([mockProducto]);
  });
});
