import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Button, Container } from 'react-bootstrap';
const CategoriesList = ({ onSelectCategory }) => {
  //  receives onSelectCategory as prop
  const [cats, setCats] = useState([]); 
  // State to store categories can update
  useEffect(() => {
    // Fetch categories once
    axios.get('https://dummyjson.com/products/category-list')
      .then(res => setCats(res.data)) 
      // Update cats state with fetched data
      .catch(err => console.error("Error fetching categories", err)); 
      // error
  }, []); 
  // Empty dependency runs only once

  return (
    <Container className="my-4">
      <h5 className="mb-3">Filter by Category:</h5>
      <div className="d-flex flex-wrap gap-2">
        <Button 
          variant="outline-dark" 
          size="sm" 
          onClick={() => onSelectCategory('')} 
          // pass from user click prop onSelectCategory
        >
          All Products
        </Button>
        {cats.map(cat => (
          <Button
            key={cat}
            variant="outline-primary" 
            size="sm"
            style={{ textTransform: 'capitalize' }}
            onClick={() => onSelectCategory(cat)}
          >
            {cat.replace('-', ' ')}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default CategoriesList; 
