
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../config/Firebase";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);

      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(ordersQuery);

      const orderData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setOrders(orderData);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-shop-muted">
            Loading orders...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-shop-text">
            Orders
          </h1>

          <p className="mt-2 text-shop-muted">
            View and manage customer orders.
          </p>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="shop-card text-center">
            <p className="text-shop-muted">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="shop-card"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-shop-muted">
                      Order ID
                    </p>

                    <h2 className="font-semibold text-shop-text">
                      {order.id}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-shop-muted">
                      Customer
                    </p>

                    <p className="font-medium text-shop-text">
                      {order.customer?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-shop-muted">
                      {order.customer?.email || "No email"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-shop-muted">
                      Total
                    </p>

                    <p className="font-bold text-shop-primary">
                      ${Number(order.total || 0).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-shop-muted">
                      Status
                    </p>

                    <span className="inline-flex rounded-full bg-shop-background px-3 py-1 text-sm font-medium text-shop-text">
                      {order.status || "pending"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminOrders;

