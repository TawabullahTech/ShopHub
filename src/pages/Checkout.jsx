import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/Order";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }
 
  async function handleSubmit(event) {
  event.preventDefault();

  try {
    const orderId = await createOrder(currentUser.uid, {
      customer: formData,
      items: cartItems,
      total,
    });

    clearCart();

    console.log("Order created:", orderId);

    navigate("/orders");
  } catch (error) {
    console.error("Failed to create order:", error);
  }
}
  

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold text-shop-text">
              Your Cart Is Empty
            </h1>

            <p className="mt-3 text-shop-muted">
              Add some products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white no-underline transition hover:bg-shop-primary-hover"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-shop-text">
              Checkout
            </h1>

            <p className="mt-2 text-shop-muted">
              Enter your delivery information to place your order.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Customer Information */}
            <form
              onSubmit={handleSubmit}
              className="shop-card lg:col-span-2"
            >
              <h2 className="text-xl font-bold text-shop-text">
                Delivery Information
              </h2>

              {/* Name */}
              <div className="mt-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-shop-text"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
                />
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-shop-text"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
                />
              </div>

              {/* Phone */}
              <div className="mt-5">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-shop-text"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                  className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
                />
              </div>

              {/* Address */}
              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-shop-text"
                >
                  Shipping Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                  required
                  className="w-full rounded-lg border border-shop-border bg-shop-surface px-4 py-3 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white transition hover:bg-shop-primary-hover"
              >
                Place Order
              </button>
            </form>

            {/* Order Summary */}
            <div className="shop-card h-fit">
              <h2 className="text-xl font-bold text-shop-text">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 border-b border-shop-border pb-4"
                  >
                    <div>
                      <p className="font-medium text-shop-text">
                        {item.name}
                      </p>

                      <p className="text-sm text-shop-muted">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-shop-text">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold text-shop-text">
                  Total
                </span>

                <span className="text-xl font-bold text-shop-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;