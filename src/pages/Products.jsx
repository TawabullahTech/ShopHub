import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../components/productGrid";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import { fetchProducts } from "../services/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    return [...filteredProducts].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name-az":
          return a.title.localeCompare(b.title);

        case "name-za":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });
  }, [products, search, sort]);

  return (
    <section className="shop-section">
      <div className="shop-container">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-shop-text md:text-5xl">
            All Products
          </h1>

          <p className="mt-3 text-base font-medium leading-7 text-shop-muted">
            Browse our complete collection of products.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <SortSelect
            value={sort}
            onChange={setSort}
          />
        </div>

        {/* Products */}
        {loading ? (
          <p className="font-medium text-shop-muted">
            Loading products...
          </p>
        ) : visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <div className="rounded-xl border border-shop-border bg-shop-surface p-8 text-center">
            <h2 className="text-xl font-bold tracking-tight text-shop-text">
              No products found
            </h2>

            <p className="mt-2 font-medium text-shop-muted">
              Try searching with a different product name.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Products;

