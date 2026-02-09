import { useState } from "react";
import { Link } from "react-router-dom"; // عشان نبعته لصفحة الساين اب
import CategoriesList from "../Categories/CategoriesList";
import ButtonSt from "../ButtonState/ButtonState";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mt-4">
      {currentUser ? (
        <div className="alert alert-success shadow-sm border-0 d-flex align-items-center mb-4">
          <span className="fs-5">Welcome back, <strong>{currentUser.name}</strong>! Explore our latest products. ✨</span>
        </div>
      ) : (
        <div className="alert alert-info shadow-sm border-0 d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">Happy Shopping</h5>
            <p className="mb-0 small">Create an account to save your favorite items and track orders.</p>
          </div>
          <Link to="/signup" className="btn btn-info text-white fw-bold shadow-sm">
            Sign Up Now
          </Link>
        </div>
      )}
      <CategoriesList onSelectCategory={handleCategoryChange} />
      <hr />
      <ButtonSt selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;