import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const [discount, setDiscount] = useState(0); // State for discounts

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.title} added to cart!`);
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0); // Clear discount when cart is cleared
  };

  const updateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const applyDiscount = (discountValue) => {
    setDiscount(discountValue);
  };

  const getCartTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total - discount;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        applyDiscount,
        getCartTotal,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
