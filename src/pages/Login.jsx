import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      await loginUser(
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="mx-auto max-w-md">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-shop-text">
              Welcome Back
            </h1>

            <p className="mt-2 text-shop-muted">
              Sign in to your ShopHub account.
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="shop-card"
          >

            {/* Email */}
            <div>
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
                className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-shop-text"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
              />
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-shop-primary no-underline hover:text-shop-primary-hover"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-shop-primary px-6 font-semibold text-white transition hover:bg-shop-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up */}
            <p className="mt-6 text-center text-sm text-shop-muted">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-shop-primary no-underline hover:text-shop-primary-hover"
              >
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;


