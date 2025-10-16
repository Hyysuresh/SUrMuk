import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🖼 Local image imports
import shoes from "../assets/products/p1.png";
import headphones from "../assets/products/p2.png";
import watch from "../assets/products/p3";
import makeupkit from "../assets/products/p4.png";

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
        discount: 20,
        image: shoes,
      },
      {
        _id: "2",
        title: "Bluetooth Headphones",
        description: "Noise-cancelling over-ear headphones with deep bass.",
        price: 4999,
        discount: 15,
        image: headphones,
      },
      {
        _id: "3",
        title: "Smart Digital Watch",
        description: "Tracks heart rate, sleep, and steps with accuracy.",
        price: 1999,
        discount: 25,
        image: watch,
      },
      {
        _id: "4",
        title: "Professional Makeup Kit",
        description: "Complete makeup kit for professional and casual use.",
        price: 1499,
        discount: 30,
        image: makeupkit,
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
