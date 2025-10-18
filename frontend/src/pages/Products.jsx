import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🖼 Local image imports
import shoes from "../assets/products/p1/thumbnail.webp";
import shoes1 from "../assets/products/p2/thumbnail.webp";
import shoes2 from "../assets/products/p3/thumbnail.webp";
import shoes3 from "../assets/products/p4/thumbnail.webp";
import shoes4 from "../assets/products/p5/thumbnail.webp";
import shoes5 from "../assets/products/p6/thumbnail.webp";
import shoes6 from "../assets/products/p7/thumbnail.webp";
import shoes7 from "../assets/products/p8/thumbnail.webp";
import shoes8 from "../assets/products/p9/thumbnail.jpeg";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🧩 Static product data for frontend display
    const demoProducts = [
      {
        _id: "1",
        title: "Running Shoes",
        description: "Comfortable lightweight running shoes for daily use.",
        price: 2999,
        discount: 50,
        image: shoes,
      },
      {
        _id: "2",
        title: "Bluetooth Headphones",
        description: "Noise-cancelling over-ear headphones with deep bass.",
        price: 4999,
        discount: 15,
        image: shoes1,
      },
      {
        _id: "3",
        title: "Smart Digital Watch",
        description: "Tracks heart rate, sleep, and steps with accuracy.",
        price: 1999,
        discount: 25,
        image: shoes2,
      },
      {
        _id: "4",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: shoes3,
      },
       {
        _id: "5",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use profasnal.",
        price: 1000,
        discount: 30,
        image: shoes4,
      },
       {
        _id: "6",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: shoes5,
      },
       {
        _id: "7",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: shoes6,
      },
       {
        _id: "8",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: shoes7,
      },
       {
        _id: "9",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: shoes8,
      },
    ];

    setTimeout(() => {
      setProducts(demoProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Our Products</h2>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const discountedPrice = Math.round(
              product.price - (product.price * product.discount) / 100
            );

            return (
              <div
                key={product._id}
                className="bg-dark-light rounded-lg overflow-hidden hover:ring-2 ring-primary transition shadow-md"
              >
                <div className="aspect-square bg-dark-lighter relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold">₹{discountedPrice}</span>
                    <span className="text-gray-500 line-through text-sm">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
