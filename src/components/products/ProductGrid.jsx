import React, { useContext } from "react";
import "./ProductGrid.css";
import useProducts from "../../hooks/useProducts";
import { CartContext } from "../../contexts/CartContext";

const ProductGrid = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useContext(CartContext); // Get addToCart function from context
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h2 className="product-name">{product.title}</h2>
          <p className="product-price">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <button className="add-to-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
