import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

// R3F lab is a separate chunk — keeps three/fiber/drei out of the main bundle.
const R3FLab = lazy(() => import("./pages/R3FLab"));

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
          <Route path="/r3f-lab" element={<Suspense fallback={null}><R3FLab /></Suspense>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
