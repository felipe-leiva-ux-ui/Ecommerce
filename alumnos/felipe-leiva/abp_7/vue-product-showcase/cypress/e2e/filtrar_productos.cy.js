describe("flujo: filtrar productos por categoría", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/products", {
      fixture: "productos.json",
    }).as("productosApi");

    cy.intercept("GET", "**/products/categories", {
      fixture: "categorias.json",
    }).as("categoriasApi");

    cy.visit("/");
    cy.wait(["@productosApi", "@categoriasApi"]);
  });

  it("muestra todos los productos al cargar", () => {
    cy.get("[data-cy=product-card]").should("have.length", 2);
  });

  it("filtra y muestra solo los productos de la categoría", () => {
    cy.get("[data-cy=filtro-categoria]").select("electronics");
    cy.get("[data-cy=product-card]").should("have.length", 1);
    cy.get("[data-cy=product-card]").first().contains("Laptop Gaming Pro");
  });
});
