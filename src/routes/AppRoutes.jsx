import { Routes, Route } from "react-router-dom";
// All Importing Files of pages
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Profile from "../pages/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../components/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";
function AppRoutes() {
  return (
    <Routes>
    
       <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
  <Route path="/profile" element={<Profile />} />
  <Route path="/checkout" element={<Checkout />} />
</Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
  <Route path="/profile" element={<Profile />} />
</Route>
//All About the Admin Routes
    <Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="settings" element={<AdminSettings />} />
  </Route>
</Route>



        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;