import React from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, decreaseCart } from "../../redux/cartSlice";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); //get all item form Redux store
  const dispatch = useDispatch(); // edit action send roles

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); // cac the total in cart

  if (cartItems.length === 0) {//cart empty
    return (
      <Container className="text-center mt-5">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Go back to Home and add some products!</p>
        {/* msg the cart is empty */}
      </Container>
    );
  }

  return ( // return in page
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart</h2> 
      {/* header */}
      <Table responsive striped bordered hover>
        <thead>
          {/* top tr ths data */}
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {/* show the item in cart */}
            {cartItems.map((item) => (
            <tr key={item.id}>
              {/* key unique value */}
              <td>
                <Image src={item.thumbnail} width="50" className="me-2" />
                {item.title}
              </td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              {/* item data id , title , price , quantity */}
              
              <td>
                <Button variant="secondary" size="sm" onClick={() => dispatch(decreaseCart(item))}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="secondary" size="sm" onClick={() => dispatch(addToCart(item))}>+</Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mt-4">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <Button variant="success" size="lg">Checkout</Button>
      </div>
    </Container>
  );
};

export default Cart;