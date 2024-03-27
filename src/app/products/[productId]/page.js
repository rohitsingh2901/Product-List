"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "../../../../api/products";
import Link from "next/link";

const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find((p) => {
          return p.id == productId;
        });
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="container mx-auto px-4 py-8">
        <Link href="/products">
          <button className="bg-yellow-200 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
            Go Back
          </button>
        </Link>
      {isLoading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p>Error fetching product: {error}</p>
      ) : product ? (
        <div className="p-4">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-50 h-50 object-cover"
            />
          </div>
          <div className="flex justify-center items-center flex-col">
          <h3 className="text-lg font-medium mb-2">{product.title}</h3>
          <h1 className=" text-3xl font-extrabold text-red-500 mb-2">₹{product.price}</h1>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
