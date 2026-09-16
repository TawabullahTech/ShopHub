
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-shop-border bg-shop-surface">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 md:grid-cols-3 lg:px-6">

        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-shop-primary no-underline"
          >
            ShopHub
          </Link>

          <p className="mt-4 max-w-sm font-serif text-[15px] italic leading-7 text-shop-muted">
            Everyday products. One simple store.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-base font-extrabold tracking-wide text-shop-text">
            Shop
          </h2>

          <nav className="mt-5 flex flex-col gap-3">
            <Link
              to="/products"
              className="text-[15px] font-medium text-shop-muted no-underline transition hover:text-shop-primary"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              className="text-[15px] font-medium text-shop-muted no-underline transition hover:text-shop-primary"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="text-[15px] font-medium text-shop-muted no-underline transition hover:text-shop-primary"
            >
              Cart
            </Link>
          </nav>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-base font-extrabold tracking-wide text-shop-text">
            Account
          </h2>

          <nav className="mt-5 flex flex-col gap-3">
            <Link
              to="/login"
              className="text-[15px] font-medium text-shop-muted no-underline transition hover:text-shop-primary"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-[15px] font-medium text-shop-muted no-underline transition hover:text-shop-primary"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-shop-border">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-5 text-center lg:px-6">
          <p className="text-sm font-semibold tracking-wide text-shop-muted">
            © 2026 ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

