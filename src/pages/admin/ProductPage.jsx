import React, { useState } from "react";
import { FaHeart, FaExchangeAlt } from "react-icons/fa";

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("New");

  const TABS = ["New", "Featured", "Special"];
  const PRODUCTS = [
    {
      name: "Anti SunSpot",
      price: "$24.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQqB76bDy3mBodj3NEGFP2JIz5W1jKSriGQ&s", // Ganti dengan URL gambar asli
    },
    {
      name: "Sensodyne Pronamel",
      price: "$34.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQqB76bDy3mBodj3NEGFP2JIz5W1jKSriGQ&s",
    },
    {
      name: "Sensodyne Mouthwash",
      price: "$24.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQqB76bDy3mBodj3NEGFP2JIz5W1jKSriGQ&s",
    },
  ];

  const ProductCard = ({ name, price, image }) => (
    <div className="bg-white p-4 rounded shadow text-center space-y-2">
      <img src={image} alt={name} className="w-24 h-24 object-contain mx-auto" />
      <h3 className="text-sm font-medium">{name}</h3>
      <div className="flex justify-center text-yellow-400 text-xs">
        {Array(5).fill("★").map((star, i) => (
          <span key={i}>{star}</span>
        ))}
      </div>
      <p className="text-blue-600 font-bold">{price}</p>
      <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded">Add to Cart</button>
      <div className="flex justify-center items-center gap-4 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1"><FaHeart /> Wish List</div>
        <div className="flex items-center gap-1"><FaExchangeAlt /> Compare</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 uppercase font-semibold border-b-2 ${
              activeTab === tab ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
