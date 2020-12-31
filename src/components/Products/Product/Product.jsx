import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  // For debug purposes to see what contains a product as properties to fetch below
  //console.log(product);
  //return <div>test</div>

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.CardContent}>
          <Typography gutterBottom variant="h5">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        {/* product.description is HTML tag value, 
        to render it as HTML use props dangerouslySetInnerHTML like below
        instead of Typography tag element value */}
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
        {/*product.description}
        </Typography>  */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {/* <IconButton aria-label="Add to Cart" onClick={onAddToCart}>*/}
          <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
