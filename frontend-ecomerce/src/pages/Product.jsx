import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";




const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();


  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(`/${product.image}`); // ✅ correct
    }
  };
  

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10">

      {/* ================= GRID LAYOUT ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

        {/* LEFT : IMAGES */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col gap-3 sm:w-[18%]">
          <img
  src={`/${productData.image}`}
  onClick={() => setImage(`/${productData.image}`)}
  className="w-[24%] sm:w-full cursor-pointer"
  alt=""
/>

          </div>

          <div className="sm:w-[80%]">
            <img
              src={image}
              className="w-full h-[500px] object-contain"
              alt=""
            />
          </div>
        </div>

        {/* RIGHT : PRODUCT DETAILS */}
        <div>
          <h1 className="font-medium text-2xl">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_dull_icon} className="w-3.5" />
            <p className="pl-2">122</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}${productData.price}
          </p>

          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>

          <p className="mt-6 mb-2">Select Size</p>

          <div className="flex gap-2 mb-4">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={` cursor-pointer border px-4 py-2 text-sm ${
                  size === item
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
  onClick={() => {
    if (!size) {
      alert("Please select size");
      return;
    }
    addToCart(productData._id, size);
    navigate("/cart");
  }}
  className="bg-gray-700 text-white px-8 py-3 text-sm cursor-pointer"
>
  Add to Cart
</button>


          <hr className="mt-8" />

          <div className="text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION FULL WIDTH ================= */}
      <div className="mt-20 text-sm">
        <div className="flex border-b">
          <b className="px-5 py-3 border-r">Description</b>
          <p className="px-5 py-3">Reviews (122)</p>
        </div>

        <div className="border px-6 py-6 flex flex-col gap-4">
          <p>
            An e-commerce website is an online platform that facilitates
            the buying and selling of products or services over the internet.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with descriptions, prices, and payment options.
          </p>
        </div>
      </div>
      <RelatedProducts
  category={productData.category}
  subCategory={productData.subCategory}
/>

    </div>
  ) : null;
};

export default Product;
