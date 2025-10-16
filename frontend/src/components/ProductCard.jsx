// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ name, price, discount, image }) {
  const finalPrice = price - (price * discount) / 100;

  return (
    <div className="bg-dark-lighter rounded-lg shadow-md overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <div className="flex justify-between mt-2">
          <p className="text-gray-400 line-through">₹{price}</p>
          <p className="text-green-400 font-bold">₹{finalPrice}</p>
        </div>
        <p className="text-red-500 text-sm mt-1">{discount}% OFF</p>
      </div>
    </div>
  );
}
