 
 import { Link, Outlet } from "react-router-dom";
import { Settings } from "lucide-react";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-shop-background">
      <div className="shop-container py-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">

          <aside className="shop-card h-fit">
            <h2 className="text-xl font-bold text-shop-text">
              ShopHub Admin
            </h2>

            <nav className="mt-6 space-y-2">
              <Link
                to="/admin"
                className="block rounded-lg px-3 py-2 font-medium text-shop-text no-underline hover:bg-shop-background"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                className="block rounded-lg px-3 py-2 font-medium text-shop-text no-underline hover:bg-shop-background"
              >
                Products
              </Link>

              <Link
                to="/admin/orders"
                className="block rounded-lg px-3 py-2 font-medium text-shop-text no-underline hover:bg-shop-background"
              >
                Orders
              </Link>

              <Link
                to="/admin/users"
                className="block rounded-lg px-3 py-2 font-medium text-shop-text no-underline hover:bg-shop-background"
              >
                Users
              </Link>

              {/* Settings */}
              <Link
                to="/admin/settings"
                className="flex items-center px-3 py-2 text-shop-text no-underline transition hover:bg-shop-background"
                aria-label="Settings"
                title="Settings"
              >
                <Settings size={20} />
              </Link>
            </nav>
          </aside>

          <main>
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}

export default AdminLayout;