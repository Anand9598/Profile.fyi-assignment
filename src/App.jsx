import CartPage from "./components/cart/CartPage";
import ProductGrid from "./components/products/ProductGrid";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import Header from "./components/header/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </>
  );
}

export default App;
