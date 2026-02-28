import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";


// 1. Create Context
export const ShopContext = createContext();

// 2. Create Provider Component
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  
  const navigate = useNavigate();


  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

 



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

 
  const addToCart = (itemId, size) => {
    setCartItems((prev) => {
      let cartData = { ...prev };

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      if (!cartData[itemId][size]) {
        cartData[itemId][size] = 1;
      } else {
        cartData[itemId][size] += 1;
      }

      return cartData;
    });
  };
  const navigateToOrder = () => {
    navigate("/place-orders");
  };
  const goToOrders = () => {
    navigate("/orders");
  }; 

  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      let cartData = { ...prev };
  
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
  
        // if no sizes left, remove product
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
  
      return cartData;
    });
  };
  
  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      let cartData = { ...prev };
  
      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
  
      return cartData;
    });
  };
  
  const getCartAmount = () => {
    let total = 0;
  
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        const product = products.find(
          (product) => product._id === items
        );
  
        if (product) {
          total += product.price * cartItems[items][item];
        }
      }
    }
  
    return total;
  };
  const getCartCount = () => {
    let totalCount = 0;
  
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
  
    return totalCount;
  };
  
  
  
  const value = {
    products , currency , delivery_fee , search , setSearch, showSearch , setShowSearch ,
    cartItems, addToCart ,getCartCount , removeFromCart , updateQuantity , getCartAmount  ,
    navigateToOrder , goToOrders,                navigate,
    // ✅ IMPORTANT
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
