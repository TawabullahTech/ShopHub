import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <section className="shop-section">
        <div className="shop-container text-center">
          <h1 className="text-3xl font-bold text-shop-text">
            Your Wishlist is Empty
          </h1>

            <p className="mt-3 font-medium leading-7 text-shop-muted">
       
            Save products to your wishlist and find them here later.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-shop-primary bg-white px-6 font-semibold text-shop-primary no-underline transition hover:bg-shop-primary hover:!text-white"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-shop-text md:text-4xl">
            Your Wishlist
          </h1>

          <p className="mt-2 text-shop-muted">
            Products you've saved for later.
          </p>
        </div>

        {/* Wishlist Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((product) => (
            <article
              key={product.id}
              className="product-card flex h-full flex-col bg-shop-surface"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                  loading="lazy"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-4">

                <h2 className="text-base font-semibold text-shop-text">
                  <Link
                    to={`/products/${product.id}`}
                    className="no-underline hover:text-shop-primary"
                  >
                    {product.title}
                  </Link>
                </h2>

                <p className="text-lg font-bold text-shop-text">
                  ${product.price.toFixed(2)}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-shop-primary px-4 font-semibold text-shop-primary transition hover:bg-shop-primary hover:!text-white"
                >
                  View Product
                </Link>

                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-shop-primary px-4 font-semibold text-shop-primary transition hover:bg-shop-primary hover:text-white"
                >
                  Remove
                </button>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Wishlist;


