import React, { useState, useEffect } from 'react';
import { CssBaseline } from "@material-ui/core";

//import Products from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/commerce';

import { Products, Navbar, Cart } from './components';

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
      const item = await commerce.cart.add(productId, quantity);

      setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // dependency array set to empty array [] means that this function is called at start of the component when it renders - component didMount

  // For debug purposes to see what contains products array retrieved from commerce.js as properties to fetch in sub components
  //console.log(products);
  console.log(cart);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Navbar totalItems={cart.total_items} />
      {/*<Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
