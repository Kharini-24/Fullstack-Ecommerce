import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";




const PlaceOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login?redirect=cart");
      return
    }
  }, [navigate]);

  const {
    cartItems,
    products,
    
    getCartAmount,
  } = useContext(ShopContext);
  

  const [method,setMethod]= useState('cod')
  // const {navigate} = useContext(ShopContext);
  const {goToOrders}=useContext(ShopContext)

  const token = localStorage.getItem("token")

  const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [postalCode, setPostalCode] = useState("");
const [country, setCountry] = useState("");
const [zipcode, setZipcode] = useState("");


  


  const handlePlaceOrder = async () => {
    try {
      // 🔹 Convert cartItems (object) → orderItems (array)
      const orderItems = [];
  
      for (const productId in cartItems) {
        const product = products.find((p) => p._id === productId);
  
        if (!product) continue;
  
        for (const size in cartItems[productId]) {
          orderItems.push({
            name: product.name,
            qty: cartItems[productId][size],
            image: product.image,
            price: product.price,
            product: product._id,
          });
        }
      }
      if (!address || !city || !postalCode || !country) {
        alert("Please fill all delivery details");
        return;
      }
      
  
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress: {
            address,
            city,
            postalCode,
            zipcode,
            country,
          },
          paymentMethod: method,
          totalPrice: getCartAmount(),
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        goToOrders(); // ✅ navigate ONLY after order is saved
      } else {
        console.log("Order failed:", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div className="border-t pt-14">
      <div className="flex flex-col sm:flex-row justify-between gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          {/* NAME */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Street address"
            value={address}
  onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          {/* CITY & STATE */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="City"
              value={city}
  onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              placeholder="State"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>

          {/* ZIP & COUNTRY */}
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Zip code"
              value={zipcode}
  onChange={(e) => setZipcode(e.target.value)}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
  onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>

          {/* PHONE */}
          <input
            type="number"
            placeholder="Phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full sm:max-w-[480px] lg:max-w-[520px]">


{/* CART TOTAL */}
<CartTotal />

{/* PAYMENT METHOD */}
<div className="mt-12">
  <Title text1={"PAYMENT"} text2={"METHOD"} />

  <div className="flex gap-3 flex-col lg:flex-row ">

    {/* STRIPE */}
    <div onClick={()=>setMethod('stripe')} className="flex items-center  gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5  border rounded-full ${method==='stripe' ? 'bg-green-400': ''}`}></p>
      <img
        src={assets.stripe_logo}
        className="h-5 mx-4"
        alt=""
      />
    </div>

    {/* RAZORPAY */}
    <div onClick={()=>setMethod('razorpay')} className="flex items-center justify-center  gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5  border rounded-full ${method==='razorpay' ? 'bg-green-400': ''}`}></p>
      <img
        src={assets.razorpay_logo}
        className="h-5 mx-4"
        alt=""
      />
    </div>
    <div  onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5  border rounded-full ${method==='cod' ? 'bg-green-400': ''}`}></p>
      <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
    </div>

  </div>
  <div className="w-full text-end mt-8" >
    <button onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm cursor-pointer"> PROCEED TO ORDER </button></div>

</div>

</div>


      </div>
    </div>
  );
};

export default PlaceOrder;
