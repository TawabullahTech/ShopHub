
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/auth";

function Navbar() {
  const { cartItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logoutUser();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-shop-border bg-shop-surface">
      <div className="mx-auto flex min-h-16 w-full max-w-[1200px] items-center justify-between px-4 lg:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-shop-primary no-underline transition hover:text-shop-primary-hover"
        >
          ShopHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="font-medium text-shop-text no-underline transition hover:text-shop-primary"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="font-medium text-shop-text no-underline transition hover:text-shop-primary"
          >
            Products
          </Link>
          
          <Link
  to="/wishlist"
  className="flex items-center gap-2 font-medium text-shop-text no-underline transition hover:text-shop-primary"
>
  <Heart size={18} />
  <span>Wishlist ({wishlistCount})</span>
</Link>
         <Link
  to="/cart"
  className="font-medium text-shop-text no-underline transition hover:text-shop-primary"
>
  Cart ({cartItemCount})
</Link>   

        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <>
              <Link
                to="/profile"
                className="font-medium text-shop-text no-underline transition hover:text-shop-primary"
              >
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded border border-sky-400 bg-white px-4 py-2 font-medium text-blue-600 transition-colors duration-200 hover:!bg-blue-600 hover:!text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded border border-sky-400 bg-white px-4 py-2 font-medium text-blue-600 no-underline transition-colors duration-200 hover:!bg-blue-600 hover:!text-white"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded border border-sky-400 bg-white px-4 py-2 font-medium text-blue-600 no-underline transition-colors duration-200 hover:!bg-blue-600 hover:!text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-shop-text transition hover:bg-shop-background md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-shop-border bg-shop-surface md:hidden">
          <nav className="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
            >
              <Heart size={19} />
              Wishlist ({wishlistCount})
            </Link>

                      <Link
                        to="/cart"
                        className="flex items-center gap-2 font-medium text-shop-text no-underline transition hover:text-shop-primary"
                          >
                      <ShoppingCart size={18} />
                          <span>Cart ({cartItemCount})</span>
                        </Link>

            <div className="my-2 border-t border-shop-border" />

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
                >
                  <User size={19} />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left font-medium text-shop-text transition hover:bg-shop-background hover:text-shop-primary"
                >
                  <LogOut size={19} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
                >
                  <LogIn size={19} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-shop-text no-underline transition hover:bg-shop-background hover:text-shop-primary"
                >
                  <UserPlus size={19} />
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;

