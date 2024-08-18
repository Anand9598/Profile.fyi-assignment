import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img
          className="img"
          width={60}
          height={40}
          src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg"
          alt="logo"
        />
      </Link>
      <div className="cart-icon">
        <Link to="/cart">
          <FaShoppingCart />
          <span className="cart-count">{cartItems.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
