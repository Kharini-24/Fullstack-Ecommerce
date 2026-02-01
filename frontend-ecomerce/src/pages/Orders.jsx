import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const {  currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.log("No token found");
          setOrders([]);
          return;
        }
  
        const res = await fetch(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = await res.json();
  
        // ✅ ONLY set orders if response is array
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          console.log("API error:", data.message);
        }
      } catch (error) {
        console.log(error);
        setOrders([]);
      }
    };
  
    fetchOrders();
  }, []);
  
  
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* ORDERS LIST */}
      <div>
  {orders.length === 0 && (
    <p className="text-gray-500">No orders found</p>
  )}

  {orders.map((order) =>
    order.orderItems.map((item, index) => (
      <div
        key={index}
        className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        {/* LEFT */}
        <div className="flex items-start gap-6 text-sm">
          <img
            className="w-16 sm:w-20"
            src={item.image}
            alt=""
          />

          <div>
            <p className="sm:text-base font-medium">
              {item.name}
            </p>

            <div className="flex items-center gap-3 mt-2 text-base">
              <p className="text-lg">
                {currency}{item.price}
              </p>
              <p>Quantity: {item.qty}</p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Date:{" "}
              <span className="text-gray-400">
                {new Date(order.createdAt).toDateString()}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
            <p className="text-sm md:text-base">
              {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>

          <button className="border px-4 py-2 text-sm">
            Track Order
          </button>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default Orders;
