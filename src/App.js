import React, { useEffect } from 'react';
// import { CssBaseline } from '@material-ui/core';
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';1
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Products, Navbar, Cart, Checkout } from './components';
import Alert from './components/SWAlert/SWAlert';
import { fetchProducts } from './actions/products';
import { fetchCart } from './actions/carts';
import { swInit } from './actions/swalert';
import { SW_INIT, SW_UPDATE } from './constants/actionTypes';
import './App.css';
import logo from './favicon.ico';

const App = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
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
          <Checkout cart={cart} />
        </Route>
      </Switch>
      {/* </div> */}
    </Router>
  );
};

export default App;
