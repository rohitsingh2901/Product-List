"use client"
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../api/products';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('title'); 

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchData();
    }, []);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const sortProducts = (productsToSort) => {
        switch (sortBy) {
            case 'title':
                return productsToSort.sort((a, b) => a.title.localeCompare(b.title));
            case 'price':
                return productsToSort.sort((a, b) => a.price - b.price);
            default:
                return productsToSort;
        }
    };

    const sortedProducts = sortProducts(products);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex justify-between mb-4">
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border rounded px-2 py-1 bg-black"
                >
                    <option value="title">Sort by Title</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
