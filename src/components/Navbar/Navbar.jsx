import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Badge, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ShoppingCart, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, Store as StoreIcon, MoveToInbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const Location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>

          {Location.pathname === '/MyStore' && (
            <>
              <Typography component={Link} to="/MyStore/cart" variant="h6" className={classes.title} color="inherit">
                <img src={logo} alt="E-sale" height="25px" className={classes.image} />
                MyCart
              </Typography>
              <div className={classes.grow} />
              <div className={classes.button}>
                {/* <Link to="/cart">go to cart</Link> */}
                <IconButton component={Link} to="/MyStore/cart" aria-label="Show cart Items" color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
            </>
          )}

          {Location.pathname === '/MyStore/cart' && (
            <>
              <Typography component={Link} to="/MyStore" variant="h6" className={classes.title} color="inherit">
                <img src={logo} alt="E-sale" height="25px" className={classes.image} />
                MyStore
              </Typography>
            </>
          )}

        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem component={Link} to="/MyStore" button key="MyStore">
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText primary="MyStore" />
          </ListItem>
          <ListItem component={Link} to="/MyStore/cart" button key="MyCart">
            <ListItemIcon><ShoppingCart /></ListItemIcon>
            <ListItemText primary="MyCart" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
