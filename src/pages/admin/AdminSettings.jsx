
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../config/Firebase";

function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "",
    email: "",
    phone: "",
    address: "",
    currency: "USD",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const settingsRef = doc(
          db,
          "settings",
          "store"
        );

        const snapshot = await getDoc(settingsRef);

        if (snapshot.exists()) {
          setSettings((current) => ({
            ...current,
            ...snapshot.data(),
          }));
        }
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      await setDoc(
        doc(db, "settings", "store"),
        settings,
        { merge: true }
      );

      setMessage("Settings saved successfully.");
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error
      );

      setMessage(
        "Failed to save settings. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-shop-muted">
            Loading settings...
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
            Settings
          </h1>

          <p className="mt-2 text-shop-muted">
            Manage your ShopHub store information.
          </p>
        </div>

        {/* Settings Form */}
        <div className="shop-card max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Store Name */}
            <div>
              <label
                htmlFor="storeName"
                className="mb-2 block font-medium text-shop-text"
              >
                Store Name
              </label>

              <input
                id="storeName"
                name="storeName"
                type="text"
                value={settings.storeName}
                onChange={handleChange}
                placeholder="ShopHub"
                className="shop-control w-full rounded-lg border border-shop-border px-3"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-shop-text"
              >
                Store Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="store@example.com"
                className="shop-control w-full rounded-lg border border-shop-border px-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-medium text-shop-text"
              >
                Store Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={settings.phone}
                onChange={handleChange}
                placeholder="+92..."
                className="shop-control w-full rounded-lg border border-shop-border px-3"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block font-medium text-shop-text"
              >
                Store Address
              </label>

              <textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="Store address"
                rows="4"
                className="w-full rounded-lg border border-shop-border px-3 py-3"
              />
            </div>

            {/* Currency */}
            <div>
              <label
                htmlFor="currency"
                className="mb-2 block font-medium text-shop-text"
              >
                Currency
              </label>

              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="shop-control w-full rounded-lg border border-shop-border px-3"
              >
                <option value="USD">USD ($)</option>
                <option value="PKR">PKR (Rs.)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="shop-control rounded-lg bg-shop-primary px-6 font-semibold text-white transition hover:bg-shop-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>

            {/* Message */}
            {message && (
              <p className="text-sm font-medium text-shop-success">
                {message}
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}

export default AdminSettings;
