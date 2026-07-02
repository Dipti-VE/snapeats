import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      {/* Admin Navbar */}
      <div style={{ padding: "10px", background: "#222", color: "white" }}>
        <Link to="/admin" style={{ marginRight: "10px", color: "white" }}>
          Dashboard
        </Link>
        <Link to="/admin/products" style={{ marginRight: "10px", color: "white" }}>
          Products
        </Link>
        <Link to="/admin/orders" style={{ marginRight: "10px", color: "white" }}>
          Orders
        </Link>
        <Link to="/admin/users" style={{ marginRight: "10px", color: "white" }}>
          Users
        </Link>
        <Link to="/admin/restaurants" style={{ color: "white" }}>
          Restaurants
        </Link>
      </div>

      {/* Page content */}
      <Outlet />
    </div>
  );
}