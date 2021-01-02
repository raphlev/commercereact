import React, { useState, useEffect } from 'react';
import { CssBaseline } from "@material-ui/core";
//import Products from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    //const cart = await commerce.cart.retrieve();
    //setCart(cart);
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    // we can destructure it directly to { cart } or keep it like this:
    const response = await commerce.cart.add(productId, quantity);

    setCart(response.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // dependency array set to empty array [] means that this function is called at start of the component when it renders - component didMount

  // For debug purposes to see what contains products array retrieved from commerce.js as properties to fetch in sub components
  //console.log(products);
  console.log(cart);

  return (
    // <CssBaseline />
    <Router>
      <div style={{ display: "flex" }}>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            {/* We are passing props to children components, known as props drilling -
            here the handle* event handler must be passed below to Cart and CartItem components
            Another solution would be to use React Context 
            instead of props drilling making the code easier if we need to pâss more props below*/}
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
