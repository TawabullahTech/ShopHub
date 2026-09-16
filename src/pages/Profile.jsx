import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/Firebase";
import { logoutUser } from "../services/auth";

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        setProfile(userSnapshot.data());
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [currentUser]);

   async function handleLogout() {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return (
      <section className="shop-section">
        <div className="shop-container">
          <p className="text-center text-shop-muted">
            Loading profile...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="mx-auto max-w-lg">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-shop-text">
              My Profile
            </h1>

            <p className="mt-3 font-medium leading-7 text-shop-muted">
              Manage your ShopHub account.
            </p>
          </div>

          {/* Profile Card */}
          <div className="shop-card">

            {/* Name */}
            <div>
              <p className="text-sm font-medium text-shop-muted">
                Full Name
              </p>

              <p className="mt-1 text-lg font-semibold text-shop-text">
                {profile?.name || "Not available"}
              </p>
            </div>

            {/* Email */}
            <div className="mt-6">
              <p className="text-sm font-medium text-shop-muted">
                Email
              </p>

              <p className="mt-1 text-lg font-semibold text-shop-text">
                {currentUser.email}
              </p>
            </div>

            {/* Account Status */}
            <div className="mt-6">
              <p className="text-sm font-medium text-shop-muted">
                Account Status
              </p>

              <p className="mt-1 font-semibold text-shop-success">
                Active
              </p>
            </div>

            {/* Actions */}
           <div className="flex justify-center gap-4">   {/* parent now centers the pair */}
  <Link
    to="/products"
    className="min-h-11 flex-1 rounded-xl border border-shop-primary bg-white px-6 font-bold text-shop-primary transition duration-200 hover:bg-shop-primary hover:!text-white"
                   >
    Continue Shopping
  </Link>

  <button
    type="button"
    onClick={handleLogout}
    className="min-h-11 flex-1 rounded-xl border border-shop-primary bg-white px-6 font-bold text-shop-primary transition duration-200 hover:bg-shop-primary hover:!text-white"
                   >
                     Logout
           </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;