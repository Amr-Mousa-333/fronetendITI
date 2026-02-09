import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
const Products = ({ product = [], deleteItem }) => {
  const dispatch = useDispatch();
  return (
    
    <Container className="mt-4">
      <Row>
        {product.map((item) => (
          <Col md={3} sm={6} xs={12} key={item.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={item.thumbnail}
                alt={item.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6">{item.title}</Card.Title>
                <span className="text-secondary small mb-2">{item.category}</span>

                <Card.Text className="small">
                  {item.description.slice(0, 50)}...
                </Card.Text>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <strong className="text-success">${item.price}</strong>
                    <span className="small">⭐ {item.rating}</span>
                  </div>
                  
                  <div className="d-flex gap-2">

                    <Link
                    to={`/item/${item.id}`}
                    className="btn btn-primary"
                  >
  View Details
                    </Link>
                    <Button 
                      variant="success" 
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Add 🛒
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;

