import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, it, beforeEach } from "vitest";
import ProductCard from "../../components/products/ProductCard.vue";

const productoMock = {
  id: 1,
  title: "Laptop Gaming Pro",
  price: 1299.99,
  category: "electronics",
  image: "https://via.placeholder.com/200",
};

describe("ProductCard", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  /* mount() monta el componente aislado */
  /* props simula la información que le llegaría desde el padre */
  /* wrapper.text() permite validar el render */
  /* wrapper.emitted() permite validar eventos */

  it("muestra nombre, precio y categoría del producto", () => {
    const wrapper = mount(ProductCard, {
      props: {
        producto: productoMock,
      },
    });

    expect(wrapper.text()).toContain("Laptop Gaming Pro");
    expect(wrapper.text()).toContain("1299.99");
    expect(wrapper.text()).toContain("electronics");
  });

  it('emite el evento "agregar" al hacer click en el botón del carrito', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        producto: productoMock,
      },
    });

    await wrapper.find(".btn-agregar").trigger("click");

    expect(wrapper.emitted("agregar")).toBeTruthy();
    expect(wrapper.emitted("agregar")[0]).toEqual([productoMock]);
  });
});
