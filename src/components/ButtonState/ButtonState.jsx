import { useState, useEffect } from "react";
import Products from "../Products/Products.jsx";
import { Container, Form, Button, Badge } from "react-bootstrap";
import axios from "axios";
function ButtonSt({ selectedCategory }) { 
  const [items, setItems] = useState([]); // all items
  const [categories, setCategories] = useState([]); // all categories
  const [loading, setLoading] = useState(false); // loading flag
  const [searchTerm, setSearchTerm] = useState(""); // search flag

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "All") {
        resetProducts();
      } else {
        handleCategoryClick(selectedCategory);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true); // flag loading
      try {
        const [prodRes, catRes] = await Promise.all([ // product result n category result ask two promise at same time (wait once time)
          // axios.get("https://dummyjson.com/products"), //product
          axios.get("http://localhost:3000/api/products"), //product
          axios.get("https://dummyjson.com/products/category-list") // category
        ]);
        setItems(prodRes.data.products); // put product result in set item
        setCategories(catRes.data); // put category result in set categories
      }
      catch (err) {
        console.error("cant hold this data :", err); // if has error console error
      }
      finally {
        setLoading(false); // change flag loading to false (done load)
      }
    };

    fetchInitialData();//call once time when render page
  }, []); // dependency array run use effect once time

  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id); // filter the set item without item delete
    setItems(filteredItems); // delete this item on page local delete refresh page item back
  };

  const handleCategoryClick = async (category) => { // click each category button
    setLoading(true); // loading flag until category load
    try {
      const res = await axios.get(`https://dummyjson.com/products/category/${category}`);// each category
      setItems(res.data.products);// put category here
    } catch (err) {
      console.error("error", err); // error cant hold category
    } finally {
      setLoading(false); // flag loading done
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();// not reload pages
    if (!searchTerm.trim()) return; // delete all space
    setLoading(true);// loading flag
    try {
      const res = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);//get product has search word
      setItems(res.data.products); // put product here
    } catch (err) { // cheek error
      console.error("Error", err);//cant hold has error
    } finally {
      setLoading(false); // change loading flag done get item
    }
  };

  const resetProducts = async () => { // get all product
    setLoading(true); // flag reload true
    try {
      // const res = await axios.get("https://dummyjson.com/products"); //get all product
      const res = await axios.get("http://localhost:3000/api/products"); //get all product
      setItems(res.data.products); // put all product
    } catch (err) {
      console.error(err); // display error
    } finally {
      setLoading(false); // set loading flag done
    }
  };

  return (
  // Container from React-Bootstrap with vertical padding py-4
  <Container className="py-4">

    {/* Form for product search, calls handleSearch on submit */}
    <Form onSubmit={handleSearch} className="mb-4 d-flex gap-2">
      
      {/* Input field bound to searchTerm state */}
      <Form.Control
        type="text" 
        placeholder="Search products item" // Placeholder text
        value={searchTerm} // Bound to searchTerm state
        onChange={(e) => setSearchTerm(e.target.value)} // Update state on typing
      />

      {/* Submit button for the search */}
      <Button type="submit" variant="dark">Search</Button>
    </Form>

    {/* Categories bar, scrollable horizontally */}
    <div className="mb-4 overflow-auto d-flex gap-2 pb-2" style={{ whiteSpace: 'nowrap' }}>
      
      {/* Badge for "All" category to reset product filter */}
      <Badge bg="secondary" className="p-2" style={{ cursor: 'pointer' }} onClick={resetProducts}>
        All
      </Badge>

      {/* Generate Badges for each category from categories array */}
      {categories.map(cat => (
        <Badge 
          key={cat} // Key for each Badge for performance
          bg="info" 
          className="p-2" 
          style={{ cursor: 'pointer', textTransform: 'capitalize' }} // Capitalize first letter
          onClick={() => handleCategoryClick(cat)} // Call function to filter by category
        >
          {cat.replace('-', ' ')} {/* Replace hyphens with space for display smartphones  smart-phones*/}
        </Badge>
      ))}
    </div>

    {/* Show loading state if loading = true */}
    {loading ? (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" role="status"></div> {/* Loading spinner */}
        <h2 className="mt-2">Loading...</h2> {/* Loading message */}
      </div>
    ) : (
      // Display products if not loading
      <Products product={items} deleteItem={deleteItem} /> 
    )}
  </Container>
);

}
export default ButtonSt;