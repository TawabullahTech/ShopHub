

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../config/Firebase";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    thumbnail: "",
  });

  const [editingId, setEditingId] = useState(null);

  async function loadProducts() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "products")
      );

      const productData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setProducts(productData);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      title: "",
      category: "",
      price: "",
      thumbnail: "",
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.price ||
      !formData.thumbnail.trim()
    ) {
      return;
    }

    try {
      setSaving(true);

      const productData = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        thumbnail: formData.thumbnail.trim(),
      };

      if (editingId) {
        await updateDoc(
          doc(db, "products", editingId),
          productData
        );
      } else {
        await addDoc(
          collection(db, "products"),
          {
            ...productData,
            createdAt: serverTimestamp(),
          }
        );
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setFormData({
      title: product.title || "",
      category: product.category || "",
      price: product.price ?? "",
      thumbnail: product.thumbnail || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(
        doc(db, "products", productId)
      );

      await loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-shop-muted">
            Loading products...
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
            Products
          </h1>

          <p className="mt-2 text-shop-muted">
            Create, update, and manage ShopHub products.
          </p>
        </div>

        {/* Product Form */}
        <div className="shop-card mb-8">
          <h2 className="text-xl font-bold text-shop-text">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="shop-control rounded-lg border border-shop-border px-3"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="shop-control rounded-lg border border-shop-border px-3"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              step="0.01"
              className="shop-control rounded-lg border border-shop-border px-3"
            />

            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Image URL"
              className="shop-control rounded-lg border border-shop-border px-3"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="shop-control rounded-lg bg-shop-primary px-5 font-semibold text-white transition hover:bg-shop-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="shop-control rounded-lg border border-shop-border px-5 font-semibold text-shop-text transition hover:bg-shop-background"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="shop-card overflow-hidden p-0">

          <div className="flex items-center justify-between border-b border-shop-border p-4">
            <h2 className="text-xl font-bold text-shop-text">
              Product Inventory
            </h2>

            <span className="text-sm font-medium text-shop-muted">
              {products.length} products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-shop-muted">
                No products found.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-shop-border">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 p-4 md:flex-row md:items-center"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-20 w-20 rounded-lg bg-shop-image object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-shop-text">
                      {product.title}
                    </h3>

                    <p className="mt-1 text-sm text-shop-muted">
                      {product.category}
                    </p>

                    <p className="mt-1 font-bold text-shop-text">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="rounded-lg border border-shop-border px-4 py-2 font-medium text-shop-text transition hover:bg-shop-background"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default AdminProducts;

