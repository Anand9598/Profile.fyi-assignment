import React, { useContext, useState } from "react";
import "./CartPage.css";
import { CartContext } from "../../contexts/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    applyDiscount,
    discount,
  } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const [validCode, setValidCode] = useState(false);

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      applyDiscount(10);
      setValidCode(true);
    } else {
      setValidCode(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-selector">
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="removeButton"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <div className="discount-section">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
              />
              <button onClick={handleApplyDiscount}>Apply Discount</button>
              {validCode && <p className="valid-code">Discount applied!</p>}
              {!validCode && discountCode && (
                <p className="invalid-code">Invalid code</p>
              )}
            </div>
            <p>Subtotal: ${(getCartTotal() + discount).toFixed(2)}</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <p>Total: ${getCartTotal().toFixed(2)}</p>
            <button onClick={handleClearCart} className="clear-cart-button">
              Clear Cart
            </button>
            {/* <button className="checkout-button">Proceed to Checkout</button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
