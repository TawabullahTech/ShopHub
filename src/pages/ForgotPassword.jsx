import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      await resetPassword(email);

      setMessage(
        "Password reset email sent. Please check your inbox."
      );

      setEmail("");
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
              Forgot Password?
            </h1>

            <p className="mt-2 text-shop-muted">
              Enter your email and we'll send you a password reset link.
            </p>
          </div>

          {/* Reset Form */}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="shop-control w-full rounded-lg border border-shop-border bg-shop-surface px-4 text-shop-text outline-none transition placeholder:text-shop-muted focus:border-shop-primary"
              />
            </div>

            {/* Success */}
            {message && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-shop-success"
              >
                {message}
              </p>
            )}

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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back to Login */}
            <p className="mt-6 text-center text-sm text-shop-muted">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-shop-primary no-underline hover:text-shop-primary-hover"
              >
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;