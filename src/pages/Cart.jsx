import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const { addToWishlist } = useWishlist();

  if (cartItems.length === 0) {
    return (
      <section className="shop-section">
        <div className="shop-container text-center">
          <h1 className="text-3xl font-bold text-shop-text">
            Your Cart is Empty
          </h1>

          <p className="mt-3 font-medium leading-7 text-shop-muted">
            Add some products to your cart before checking out.
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
            Your Cart
          </h1>

          <p className="mt-2 text-shop-muted">
            Review your items before checkout.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-shop-border bg-shop-surface p-4 sm:flex-row"
              >
                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-32 w-32 rounded-lg bg-shop-image object-contain p-3"
                />

                {/* Product Information */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold text-shop-text">
                      {item.title}
                    </h2>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-shop-muted transition hover:text-shop-primary"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-semibold text-shop-primary">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-shop-border text-lg font-semibold text-shop-text transition hover:border-shop-primary hover:text-shop-primary"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span
                      className="min-w-8 text-center font-semibold text-shop-text"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-shop-border text-lg font-semibold text-shop-text transition hover:border-shop-primary hover:text-shop-primary"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="h-fit rounded-xl border border-shop-border bg-shop-surface p-6">
            <h2 className="text-xl font-bold text-shop-text">
              Order Summary
            </h2>

            <div className="mt-6 flex items-center justify-between border-b border-shop-border pb-4">
              <span className="text-shop-muted">
                Subtotal
              </span>

              <span className="font-semibold text-shop-text">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-shop-text">
                Total
              </span>

              <span className="text-xl font-bold text-shop-primary">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg border border-shop-primary bg-white px-6 font-semibold text-shop-primary no-underline transition hover:bg-shop-primary hover:!text-white"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-3 flex min-h-11 items-center justify-center rounded-lg border border-shop-primary px-6 font-semibold text-shop-primary no-underline transition hover:bg-shop-primary hover:!text-white"
            >
              Continue Shopping
            </Link>

            <button
              type="button"
              onClick={() => {
                cartItems.forEach((item) => {
                  addToWishlist(item);
                });
              }}
              className="mt-3 flex min-h-11 w-full items-center justify-center rounded-lg border border-shop-primary px-6 font-semibold text-shop-primary transition hover:bg-shop-primary hover:!text-white"
            >
              Add to Wishlist
            </button>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Cart;


