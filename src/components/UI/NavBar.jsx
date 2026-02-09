import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ضفنا useNavigate
import { Navbar, Container, Nav, Badge, Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice.js";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);

  // جلب بيانات المستخدم الحالي من الـ LocalStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // مسح بيانات الدخول
    navigate("/login"); // التوجيه لصفحة اللوجن
  };

  return (
    <Navbar bg={mode === "light" ? "white" : "dark"} variant={mode} expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          Amor Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/features">Features</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            
            {/* عرض السلة */}
            <Nav.Link as={NavLink} to="/cart" className="position-relative d-flex align-items-center me-2">
              <span style={{ fontSize: '1.2rem' }}>🛒</span>
              {cartItems.length > 0 && (
                <Badge 
                  pill bg="danger" className="position-absolute"
                  style={{ top: "-5px", right: "-5px", fontSize: "0.7rem" }}
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* الجزء الخاص بالمستخدم (Login/Logout) */}
            {currentUser ? (
              <NavDropdown title={`Welcome, ${currentUser.name}`} id="user-dropdown" className="fw-bold">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2 ms-2">
                <Button as={NavLink} to="/login" variant="outline-primary" size="sm">Login</Button>
                <Button as={NavLink} to="/signup" variant="primary" size="sm">Sign Up</Button>
              </div>
            )}

            {/* زر تغيير الثيم */}
            <Button variant="outline-secondary" className="ms-3" onClick={() => dispatch(toggleTheme())}>
              {mode === "light" ? "🌙" : "☀️"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;