import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MyNavbar from "./components/UI/NavBar.jsx";
import Home from "./components/pages/Home.jsx";
import ProductDetails from "./components/pages/ProductDetails.jsx";
import About from "./components/pages/About.jsx";
import Cart from "./components/pages/Cart.jsx";
import Signup from "./components/pages/signup.jsx";
import Login from "./components/pages/login.jsx";
import Footer from "./components/UI/Footer.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FloatingActions from "./components/UI/FloatingActions.jsx";

function App() {
  const mode = useSelector((state) => state.theme.mode);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    document.body.className = mode === "dark" ? "dark-mode" : "light-mode";
  }, [mode]);

  return (
    <div className="app-container">
      <MyNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/item/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to="/" /> : <Signup />} 
          />
          <Route path="*" element={<h1 className="text-center mt-5">404 Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;