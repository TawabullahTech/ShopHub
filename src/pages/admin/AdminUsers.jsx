import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../config/firebase";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "users")
      );

      const userData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setUsers(userData);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-shop-muted">
            Loading users...
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
            Customers
          </h1>

          <p className="mt-2 text-shop-muted">
            View registered ShopHub customers.
          </p>
        </div>

        {/* User List */}
        {users.length === 0 ? (
          <div className="shop-card text-center">
            <p className="text-shop-muted">
              No users found.
            </p>
          </div>
        ) : (
          <div className="shop-card overflow-hidden p-0">
            <div className="border-b border-shop-border p-4">
              <h2 className="text-xl font-bold text-shop-text">
                Customer List
              </h2>
            </div>

            <div className="divide-y divide-shop-border">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-shop-text">
                      {user.name || "Unknown"}
                    </h3>

                    <p className="text-sm text-shop-muted">
                      {user.email || "No email"}
                    </p>
                  </div>

                  <div>
                    <span className="rounded-full bg-shop-background px-3 py-1 text-sm font-medium text-shop-text">
                      {user.role || "customer"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default AdminUsers;

