
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../config/Firebase";

function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  async function loadDashboardData() {
    try {
      setLoading(true);

      const [productsSnapshot, ordersSnapshot, usersSnapshot] =
        await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "users")),
        ]);

      let revenue = 0;

      ordersSnapshot.forEach((document) => {
        const order = document.data();

        revenue += Number(order.total || 0);
      });

      setStats({
        products: productsSnapshot.size,
        orders: ordersSnapshot.size,
        users: usersSnapshot.size,
        revenue,
      });
    } catch (error) {
      console.error(
        "Failed to load dashboard data:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-shop-muted">
            Loading dashboard...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-shop-text md:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-shop-muted">
            Overview of your ShopHub store.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Products */}
          <div className="shop-card">
            <p className="text-sm font-medium text-shop-muted">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-bold text-shop-text">
              {stats.products}
            </p>
          </div>

          {/* Orders */}
          <div className="shop-card">
            <p className="text-sm font-medium text-shop-muted">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-shop-text">
              {stats.orders}
            </p>
          </div>

          {/* Customers */}
          <div className="shop-card">
            <p className="text-sm font-medium text-shop-muted">
              Total Customers
            </p>

            <p className="mt-2 text-3xl font-bold text-shop-text">
              {stats.users}
            </p>
          </div>

          {/* Revenue */}
          <div className="shop-card">
            <p className="text-sm font-medium text-shop-muted">
              Total Revenue
            </p>

            <p className="mt-2 text-3xl font-bold text-shop-primary">
              ${stats.revenue.toFixed(2)}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;

