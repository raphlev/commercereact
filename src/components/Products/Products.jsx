import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

const products = [
  {
    id: 1,
    name: "Shoes",
    description: "Running shoes.",
    price: "$5",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30s96vkDAk6m_73EJimh5NneyRSOp4LIP5utLP_QrNuabNTLuAqa8Beoug1fE38L58PshWCcl&usqp=CAc",
  },
  {
    id: 2,
    name: "MacBook",
    description: "Apple macbook.",
    price: "$10",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-deHWocg78ArMXJDNpKpTHrs0faNW6BAthlyNVudglw4BBm5OXQJREjqQMX9PBnqDe39NjkY&usqp=CAc",
  },
];
const Products = () => {
    return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
    )



}

export default Products;
