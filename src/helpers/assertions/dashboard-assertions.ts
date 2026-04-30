import { assertGreaterThan, assertTruthy, assertHasText } from "./general-assertions";
import { DashboardPage } from "../../pages/DashboardPage";
import { Product, ProductWithLocator } from "../../models/Product";

/**
 * Valida que la lista de productos sea válida:
 * - Al menos un producto
 * - Cada producto tiene nombre y precio mayor a 0
 */
export function assertProductsValid(products: Product[]): void {
  assertGreaterThan(products.length, 0, "Product list should not be empty");

  for (const product of products) {
    assertTruthy(
      product.name,
      `Product name is missing: ${JSON.stringify(product)}`
    );

    assertGreaterThan(
      product.price,
      0,
      `Product price should be greater than 0 for: "${product.name}"`
    );
  }
}

/**
 * Valida que un producto fue agregado al carrito correctamente,
 * verificando que el botón cambia a "Remove".
 */
export async function assertProductAdded(
  product: ProductWithLocator,
  dashboardPage: DashboardPage
): Promise<void> {
  assertTruthy(product.name, "Product name should exist before asserting add");
  assertGreaterThan(product.price, 0, "Product price should be valid before asserting add");

  const button = dashboardPage.getAddToCartButtonFromItem(product.item);

  await assertHasText(
    button,
    "Remove",
    `Button for "${product.name}" should change to "Remove" after adding to cart`
  );
}