import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (searchParams.get("category")) params.category = searchParams.get("category");
      if (searchParams.get("search")) params.search = searchParams.get("search");
      if (searchParams.get("sort")) params.sort = searchParams.get("sort");

      const { data } = await axios.get("/api/products", { params });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "electronics",
    "accessories",
    "clothing",
    "home-decor",
    "health-care",
    "makeup",
    "others",
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-64 bg-dark-lighter rounded-lg p-4 shadow-lg">
          <h3 className="font-bold mb-4 text-primary">Filters</h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Category</h4>
            <select
              value={searchParams.get("category") || ""}
              onChange={(e) => {
                if (e.target.value) {
                  setSearchParams({ category: e.target.value });
                } else {
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                }
              }}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Sort By</h4>
            <select
              value={searchParams.get("sort") || ""}
              onChange={(e) => {
                if (e.target.value) {
                  setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value });
                } else {
                  searchParams.delete("sort");
                  setSearchParams(searchParams);
                }
              }}
              className="w-full bg-dark border border-dark-lighter rounded px-3 py-2"
            >
              <option value="">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No products found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const discount =
                  product.discountPercentage || product.discount || 0;
                const discountedPrice = product.price
                  ? Math.round(product.price - (product.price * discount) / 100)
                  : null;

                return (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="bg-dark-light rounded-lg overflow-hidden hover:ring-2 ring-primary transition shadow-md"
                  >
                    <div className="aspect-square bg-dark-lighter flex items-center justify-center relative">
                      {product.image || product.imageUrl ? (
                        <img
                          src={product.image || product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl">📦</span>
                      )}

                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {discountedPrice ? (
                          <>
                            <span className="text-green-400 font-bold">
                              ₹{discountedPrice}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              ₹{product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-primary font-bold">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
