

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleBuyNow() {
    addToCart(product);
    navigate("/cart");
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-shop-border bg-shop-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Product Image */}
     <Link to={`/products/${product.id}`} className="block">
  <div className="aspect-square w-full bg-shop-image">
    <img
      src={product.thumbnail}
      alt={product.title}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  </div>
</Link>

      {/* Product Information */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-medium text-shop-muted">
          {product.category}
        </p>

        <h3 className="text-base font-semibold text-shop-text">
          <Link
            to={`/products/${product.id}`}
            className="no-underline hover:text-shop-primary"
          >
            {product.title}
          </Link>
        </h3>

        <p className="text-lg font-bold text-shop-text">
          ${product.price.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleBuyNow}
          className="mt-1 min-h-10 w-full rounded-xl bg-shop-primary px-4 font-semibold text-white transition hover:bg-shop-primary-hover active:bg-shop-primary-active"
        >
          Buy Now
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

