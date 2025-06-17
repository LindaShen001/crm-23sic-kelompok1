import React, { useState } from "react";
import shadowobatsalep from "../../assets/images/shadowobatsalep.png";
import shadowobattablet1 from "../../assets/images/shadowobattablet1.png";
import shadowobattablet2 from "../../assets/images/shadowobattablet2.png";




const ProductPage = () => {
  const PRODUCTS = [
    {
      name: "Obat Salep Hansaplast",
      price: "$24.00",
      image: shadowobatsalep,
    },
    {
      name: "Obat tables Ezetrol",
      price: "$24.00",
      image: shadowobattablet1,
    },
  ];

  return (
    <div className="bg-[#ecebe6] text-[#1d1d1d] font-sans px-6 py-10 max-w-6xl mx-auto">
      {/* Header */}
      <h2 className="text-center uppercase tracking-widest text-sm mb-4">
        The Collection
      </h2>

      {/* Product Row */}
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-10 gap-6 mb-8">
        {PRODUCTS.map((product, index) => (
          <div key={index} className="text-center">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto w-32 h-auto mb-2"
            />
            <p className="text-xs tracking-wide">{product.name}</p>
            <p className="text-xs">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 w-full mb-8"></div>

      {/* Why Aloe Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-14">
        <img
          src="https://diabetesstore.com.bd/image/cache/catalog/All%20medicine%20and%20Manufacturer/Unimed/EZETROL-Tab-1200x1200.jpg.webp"
          alt="Ezetrol Lipid Trowing"
          className="w-full md:w-1/2 object-cover"
        />
        <div className="md:w-1/2 text-sm">
          <h3 className="uppercase tracking-widest text-xs font-medium mb-2">
            Why Ezetrol?
          </h3>
          <h2 className="uppercase font-semibold mb-4 text-base">
            Ezetrol Tablet
          </h2>
          <p className="mb-4">
            Ezetrol has been widely used in cosmetic and health applications
            for centuries. Our products are infused with organic aloe sourced
            from the finest farms, using it as the base ingredient in all of our
            products.
          </p>
          <div className="flex gap-4">
            <button className="border border-black text-xs px-4 py-1 uppercase">
              Shop
            </button>
            <button className="border border-black text-xs px-4 py-1 uppercase">
              Our Philosophy
            </button>
          </div>
        </div>
      </div>

      {/* Featured Product Detail */}
      <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
        <img
          src={shadowobattablet2}
          alt="Ezetrol LIpid Trowing"
          className="w-full md:w-1/3 object-contain"
        />
        <div className="md:w-2/3 text-sm">
          <h2 className="uppercase font-semibold mb-3">
            Ezetrol Lipid Trwoing
          </h2>
          <p className="mb-4">
            A soothing daily face wash, ideal for dry skin. Aloe vera gently
            hydrates as it cleanses, making it the perfect daily wash for
            sensitive skin. Formulated with no artificial ingredients and
            infused with our signature aloe base.
          </p>
          <button className="bg-black text-white text-xs px-5 py-2 uppercase">
            Shop
          </button>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="mt-16 text-center text-xs text-gray-600 flex flex-wrap justify-center gap-4">
        <a href="#">Blog</a>
        <a href="#">Our Philosophy</a>
        <a href="#">Face</a>
        <a href="#">Body</a>
        <a href="#">Room</a>
      </div>

      {/* Logo */}
      <div className="mt-6 text-center">
        <span className="text-2xl font-bold tracking-wide">a</span>
      </div>
    </div>
  );
};

export default ProductPage;
