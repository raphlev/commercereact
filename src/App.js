import React, { useEffect } from 'react';
// import { CssBaseline } from '@material-ui/core';
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';1
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Products, Navbar, Cart, Checkout } from './components';
import Alert from './components/SWAlert/SWAlert';
import { fetchProducts } from './actions/products';
import { fetchCart } from './actions/cart';
import { swInit } from './actions/swalert';
import { SW_INIT, SW_UPDATE } from './constants/actionTypes';
import './App.css';
import logo from './favicon.ico';

const App = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const errorMessage = useSelector((state) => state.errorMessage);
  const isServiceWorkerInitialized = useSelector((state) => state.serviceWorkerInitialized);
  const isServiceWorkerUpdated = useSelector((state) => state.serviceWorkerUpdated);
  const serviceWorkerRegistration = useSelector((state) => state.serviceWorkerRegistration);

  const dispatch = useDispatch();

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', (e) => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  /*
 const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
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
  };

  }; */

  useEffect(() => {
    dispatch(swInit());
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []); // dependency array set to empty array [] means that this function is called at start of the component when it renders - component didMount

  // For debug purposes to see what contains products array retrieved from commerce.js as properties to fetch in sub components
  // console.log(products);
  // console.log(cart);

  return (
    <Router>
      {/* <div style={{ display: 'flex' }}> */}
      {/* <CssBaseline /> */}
      <Navbar totalItems={cart.total_items} />
      {isServiceWorkerUpdated && isServiceWorkerInitialized && (
      <div className="App">
        <div className="App-alert">
          {isServiceWorkerInitialized && (
          <Alert text="Service Worker is initialized for the first time" type={SW_INIT} />
          )}
          {isServiceWorkerUpdated && (
          <Alert
            text="There is a new version available."
            buttonText="Update"
            type={SW_UPDATE}
            onClick={updateServiceWorker}
          />
          )}
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            isServiceWorkerInitialized:{' '}
            {JSON.stringify(isServiceWorkerInitialized)}
          </p>
          <p>isServiceWorkerUpdated: {JSON.stringify(isServiceWorkerUpdated)}</p>
        </header>
      </div>
      )}
      <Switch>
        <Route exact path="/MyStore">
          <Products products={products} /> {/*  onAddToCart={handleAddToCart}  */}
        </Route>
        <Route exact path="/MyStore/cart">
          { /* We are passing props to children components, known as props drilling -
            here the handle* event handler must be passed below to Cart and CartItem components
            Another solution would be to use React Context
            instead of props drilling making the code easier if we need to pâss more props below */ }
          <Cart cart={cart} /> {/* handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} */}
        </Route>
        <Route exact path="/MyStore/checkout">
          <Checkout cart={cart} order={order} errorMessage={errorMessage} />
        </Route>
      </Switch>
      {/* </div> */}
    </Router>
  );
};

export default App;
