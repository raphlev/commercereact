import React, { useState, useEffect } from 'react';
// import { CssBaseline } from '@material-ui/core';
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';1
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    // const response = await commerce.cart.retrieve();
    // setCart(response);
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    // we can destructure it directly to { cart } or keep it like this:
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  /*
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

 const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }; */

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // dependency array set to empty array [] means that this function is called at start of the component when it renders - component didMount

  // For debug purposes to see what contains products array retrieved from commerce.js as properties to fetch in sub components
  // console.log(products);
  // console.log(cart);

  return (
    <Router>
      {/* <div style={{ display: 'flex' }}> */}
      {/* <CssBaseline /> */}
      <Navbar totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/MyStore">
          <Products products={products} onAddToCart={handleAddToCart} />
        </Route>
        <Route exact path="/MyStore/cart">
          { /* We are passing props to children components, known as props drilling -
            here the handle* event handler must be passed below to Cart and CartItem components
            Another solution would be to use React Context
            instead of props drilling making the code easier if we need to pâss more props below */ }
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />
        </Route>
        <Route exact path="/MyStore/checkout">
          <Checkout cart={cart} />
        </Route>
      </Switch>
      {/* </div> */}
    </Router>
  );
};

export default App;
