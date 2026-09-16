import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/productGrid";
import { fetchProducts } from "../services/products";
import HeroImages from "../components/HeroCarousel";

function Home() {
  const [products, setProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HeroImages.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      {/* Hero Section */}
      <section className="shop-section">
        <div className="shop-container">
          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>
              <p className="text-base font-bold uppercase tracking-wide text-shop-primary">
                Welcome to ShopHub
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight text-shop-text md:text-5xl">
                Find your next favourite.
              </h1>

              <p className="mt-5 max-w-xl text-xl font-medium leading-8 text-shop-muted">
                Discover everyday products, simple shopping, and everything
                you need in one place.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-block rounded-lg border-2 border-blue-500 bg-white px-6 py-3 text-lg font-semibold text-shop-primary transition hover:bg-shop-primary hover:!text-white"
              >
                Shop Products
              </Link>
            </div>

            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-shop-image p-6">
              {HeroImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`ShopHub hero ${index + 1}`}
                  className={`absolute inset-0 h-full w-full rounded-lg object-contain p-6 shadow-sm transition-all duration-[3500ms] ease-in-out ${
                    index === activeImage
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="shop-section">
        <div className="shop-container">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-shop-text">
              Featured Products
            </h2>

            <p className="mt-2 text-shop-muted">
              Explore some of our featured products.
            </p>
          </div>

          {loading ? (
            <p className="text-shop-muted">
              Loading products...
            </p>
          ) : (
            <ProductGrid products={products} />
          )}

        </div>
      </section>
    </>
  );
}

export default Home;



