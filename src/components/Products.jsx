import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const data = await response.json();
      // Simulate out of stock for every 4th product
      const modifiedData = data.map((product, index) => ({
        ...product,
        inStock: index % 6 !== 0, // Just a simulation: every 4th is out of stock
      }));

      setProducts(modifiedData);
      setFiltered(modifiedData);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  const handleFilter = (category) => {
    if (category === "all") {
      setFiltered(products);
    } else {
      const filteredItems = products.filter(
        (item) => item.category === category
      );
      setFiltered(filteredItems);
    }
  };

  const LoadingSkeleton = () => (
    <>
      {[...Array(6)].map((_, idx) => (
        <div
          className="w-100"
          key={`skeleton-${idx}`}
        >
          <Skeleton height={500} />
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="display-5">Latest Products</h2>
          <hr />
        </div>
      </div>

      <div className="d-flex flex-wrap py-2">
        {categoryFilters.map(({ label, value }) => (
          <button
            key={value}
            className="btn btn-outline-dark btn-sm mx-1 my-2"
            onClick={() => handleFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="product-card-grid">
        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <p className="text-center">No products found in this category.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
