import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="card hover:shadow-lg rounded-lg overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                <p className=" font-extrabold text-red-500 mb-2">₹{product.price}</p>
                <Link href={`/products/${product.id}`}>
                    <button className="bg-yellow-200 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard
