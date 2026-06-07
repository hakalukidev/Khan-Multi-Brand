import ProductCatalogClient from "@/components/products/ProductCatalogClient";
import { getAllCategories } from "@/lib/category-service";
import { getCachedProducts } from "@/lib/product-cache";

export default async function ProductsPage() {
  const [initialCategories, initialProducts] = await Promise.all([
    getAllCategories(),
    getCachedProducts(),
  ]);

  return (
    <ProductCatalogClient
      initialCategories={initialCategories}
      initialProducts={initialProducts}
    />
  );
}
