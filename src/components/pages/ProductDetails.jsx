import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap"; 
import axios from "axios"; 
import { useDispatch } from "react-redux"; 
import { addToCart } from "../../redux/cartSlice"; 
const ProductDetails = () => {
  const { id } = useParams(); 
  // Get product ID from URL
  const navigate = useNavigate(); 
  // Hook to navigate
  const dispatch = useDispatch(); 
  // Redux dispatch function
  const [product, setProduct] = useState(null);
  // State to store product details not has a details yet
  const [loading, setLoading] = useState(true);
  // State to handle loading state
  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true); 
        // Set loading true before fetching
        const response = await axios.get(`https://dummyjson.com/products/${id}`); 
        // Fetch product data by ID
        setProduct(response.data); 
        // Update product state
      } catch (error) {
        console.error("Error", error); 
        // error
      } finally {
        setLoading(false); 
        // Set loading false done
      }
    };
    getProductData();
  }, [id]);
  // Run effect whenever id changes

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" /> 
        {/* Loading spinner */}
        <p>search about producet</p> 
      </Container>
    );
  }

  if (!product) return <p className="text-center mt-5">Product not found!</p>; 
  // Show message if product is not found

  return (
    <Container className="mt-5 py-5">

      <Row>
        <Col md={6} className="text-start">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="img-fluid rounded shadow-sm w-100" 
            style={{ maxHeight: '400px', objectFit: 'contain' }}
            // Product image styling
          />

          <div className="mt-4">
            <Button 
              variant="outline-dark" 
              onClick={() => navigate(-1)} 
              className="px-4 shadow-sm"
            >
              ← Back to Products
            </Button>
          </div>
        </Col>

        <Col md={6}>
          <Badge bg="info" className="mb-2">{product.category}</Badge> 
          {/* Show product category */}

          <h1 className="display-5 fw-bold">{product.title}</h1> 
          {/* Product title */}

          <p className="text-muted mb-4">{product.description}</p> 
          {/* Product description */}

          <div className="d-flex align-items-center mb-4">
            <h2 className="text-primary me-3 mb-0">${product.price}</h2> 
            {/* Product price */}

            <Badge bg="warning" text="dark">⭐ {product.rating}</Badge> 
            {/* Product rating */}
          </div>

          <ul className="list-unstyled mb-4">
            <li className="mb-2"><strong>Brand:</strong> {product.brand}</li> 
            {/* Product brand */}

            <li className="mb-2">
              <strong>Stock:</strong> 
              <span className={product.stock > 0 ? "text-success ms-1" : "text-danger ms-1"}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </li>
          </ul>

          <Button 
            variant="success" 
            size="lg" 
            className="px-5 mt-2 w-100 w-md-auto"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
          {/*add product to the cart */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails; 
