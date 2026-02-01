import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";



const Cart = () => {
  const { products, currency, cartItems , removeFromCart, updateQuantity,getCartAmount, navigateToOrder } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item.id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b grid grid-cols-[3fr_2fr_1fr_auto] items-center gap-6"
            >
              {/* PRODUCT INFO */}
                <div className="flex items-start gap-4">
                  <img src={`/${productData.image}`} className="w-16 sm:w-20" alt="" />
                  <div>
                    <p className="font-medium">{productData.name}</p>
                    <p className="text-sm">Size: {item.size}</p>
                    <p>{currency}{productData.price}</p>
                  </div>
                </div>

{/* QUANTITY */}
<div className=" cursor-pointer flex items-center justify-center gap-3">
  <button
    onClick={() =>
      updateQuantity(item.id, item.size, item.quantity - 1)
    }
    className="border px-2"
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      updateQuantity(item.id, item.size, item.quantity + 1)
    }
    className="border px-2"
  >
    +
  </button>
</div>


{/* TOTAL */}
<p className="text-right">
  {currency}{productData.price * item.quantity}
</p>

{/* DELETE */}
<img
  src={assets.bin_icon}
  onClick={() => removeFromCart(item.id, item.size)}
  className="w-4 cursor-pointer opacity-70 hover:opacity-100"
  alt=""
/>

            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-end">
  <div className="w-full sm:w-[400px]">
    <CartTotal />
    <div className="mt-8 flex justify-end">
  <button
    onClick={navigateToOrder}
    disabled={getCartAmount() === 0}
    className={`px-8 py-3 text-sm text-white ${
      getCartAmount() === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-gray-800"
    }`}
  >
    PROCEED TO CHECKOUT
  </button>
</div>

  </div>
</div>

    </div>
  );
};

export default Cart;
