import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/Firebase";

function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "text-yellow-600";

    case "processing":
      return "text-blue-600";

    case "shipped":
      return "text-purple-600";

    case "delivered":
      return "text-shop-success";

    case "cancelled":
      return "text-red-600";

    default:
      return "text-shop-muted";
  }
}

  useEffect(() => {
    async function loadOrders() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(ordersQuery);

        const orderData = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data(),
          }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
            const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
            return bTime - aTime;
          });

        setOrders(orderData);
      } catch (error) {
  console.error("Failed to load orders:", error);
  setError("Failed to load your orders. Please try again.");
}   finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [currentUser]);

  if (loading) {
   if (error) {
  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold text-shop-text">
            My Orders
          </h1>

          <p className="mt-3 text-red-600">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white no-underline transition hover:bg-shop-primary-hover"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
  }
  if (orders.length === 0) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold text-shop-text">
              My Orders
            </h1>

            <p className="mt-3 text-shop-muted">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white no-underline transition hover:bg-shop-primary-hover"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="mx-auto max-w-4xl">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-shop-text">
              My Orders
            </h1>

            <p className="mt-2 text-shop-muted">
              View your ShopHub order history.
            </p>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="shop-card"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="text-sm text-shop-muted">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-semibold text-shop-text">
                      {order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-shop-muted">
                      Status
                    </p>
                  <p
  className={`mt-1 font-semibold capitalize ${getStatusClass(
    order.status
  )}`}
>
  {order.status}
</p>
                    
                  </div>
                </div>

                <div className="mt-6 border-t border-shop-border pt-5">
                  <p className="mb-3 font-semibold text-shop-text">
                    Items
                  </p>

                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <span className="text-shop-muted">
                          {item.name} × {item.quantity}
                        </span>

                        <span className="font-medium text-shop-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-shop-border pt-5">
                  <span className="font-semibold text-shop-text">
                    Total
                  </span>

                  <span className="text-xl font-bold text-shop-primary">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Orders;

