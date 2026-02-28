import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    sales: 0,
    products: 0,
  });

  // Protect admin page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (section !== "users") return;
  
      const token = localStorage.getItem("token");
  
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUsers();
  }, [section]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (section !== "orders") return;
  
      const token = localStorage.getItem("token");
  
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchOrders();
  }, [section]);
  const markDelivered = async (id) => {
    const token = localStorage.getItem("token");
  
    try {
      await fetch(`http://localhost:5000/api/orders/${id}/deliver`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Refresh orders after update
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, isDelivered: true }
            : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      if (section !== "products") return;
  
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProducts();
  }, [section]);
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
  
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remove product from UI instantly
      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchStats = async () => {
      if (section !== "dashboard") return;
  
      const token = localStorage.getItem("token");
  
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/products"),
        ]);
  
        const users = await usersRes.json();
        const orders = await ordersRes.json();
        const products = await productsRes.json();
  
        const totalSales = orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
  
        setStats({
          users: users.length,
          orders: orders.length,
          sales: totalSales,
          products: products.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchStats();
  }, [section]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-600 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Panel
      </h1>

      {/* Section Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setSection("dashboard")} className="px-4 py-2 bg-black text-white rounded cursor-pointer">
          Dashboard
        </button>
        <button onClick={() => setSection("users")} className="px-4 py-2 bg-black text-white rounded cursor-pointer">
          Users
        </button>
        <button onClick={() => setSection("orders")} className="px-4 py-2 bg-black text-white rounded cursor-pointer">
          Orders
        </button>
        <button onClick={() => setSection("products")} className="px-4 py-2 bg-black text-white rounded cursor-pointer">
          Products
        </button>
      </div>

      {/* Section Content */}
      <div className="bg-white dark:bg-gray-500 p-6 rounded shadow">

      {section === "dashboard" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-blue-500 text-white p-6 rounded shadow">
      <h3 className="text-lg">Total Users</h3>
      <p className="text-2xl font-bold">{stats.users}</p>
    </div>

    <div className="bg-green-500 text-white p-6 rounded shadow">
      <h3 className="text-lg">Total Orders</h3>
      <p className="text-2xl font-bold">{stats.orders}</p>
    </div>

    <div className="bg-purple-500 text-white p-6 rounded shadow">
      <h3 className="text-lg">Total Sales</h3>
      <p className="text-2xl font-bold">₹{stats.sales}</p>
    </div>

    <div className="bg-red-500 text-white p-6 rounded shadow">
      <h3 className="text-lg">Total Products</h3>
      <p className="text-2xl font-bold">{stats.products}</p>
    </div>

  </div>
)}
        {section === "users" && (
  <div>
    <h2 className="text-xl font-bold mb-4">All Users</h2>

    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-500">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">
              {user.isAdmin ? "Yes" : "No"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {section === "orders" && (
  <div>
    <h2 className="text-xl font-bold mb-4">All Orders</h2>

    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="p-2 border">User</th>
          <th className="p-2 border">Total</th>
          <th className="p-2 border">Paid</th>
          <th className="p-2 border">Delivered</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="p-2 border">
              {order.user?.name}
            </td>
            <td className="p-2 border">
              ₹{order.totalPrice}
            </td>
            <td className="p-2 border">
              {order.isPaid ? "Yes" : "No"}
            </td>
            <td className="p-2 border">
              {order.isDelivered ? "Yes" : "No"}
            </td>
            <td className="p-2 border">
              {!order.isDelivered && (
                <button
                  onClick={() => markDelivered(order._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Mark Delivered
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {section === "products" && (
  <div>
    <h2 className="text-xl font-bold mb-4">Manage Products</h2>

    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="p-2 border">Image</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="p-2 border">
              <img
                src={product.image}
                alt=""
                className="w-12 h-12 object-cover"
              />
            </td>
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">₹{product.price}</td>
            <td className="p-2 border">
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminPage;