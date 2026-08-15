import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/in-form" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bag" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
