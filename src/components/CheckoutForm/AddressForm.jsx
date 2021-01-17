import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      address1: '',
      email: '',
      city: '',
      zip: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  // const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  //  Object.entries = convert an object into a 2D array,
  //  map = transform from a 2D array of code,name into an array of objects with id and label
  // console.log(countries); = array of countries with id and label
  // const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  //  Object.entries = convert an object into a 2D array,
  //  map = transform from a 2D array of code,name into an array of objects with id and label
  // console.log(subdivisions); = array of subdivisions with id and label
  // const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));
  // console.log(options); = array of options with id and label being a template string of other attributes

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries); // counbtries is an object - check console.log of this object
    setShippingCountry(Object.keys(countries)[0]); // first element of object being an array [FR,EN,..] and we want to fetch the first value
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]); // select the first subdivision available
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    if (options[0] != null) {
      setShippingOption(options[0].id); // select the first shipping option available
    }
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []); // dependency array left empty so we want it executed when component did mount

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...methods}>
        {/*
         hook Form needs a useForm method in which all the 6 Input proprties
         are passed automatically in data argument
         we also need to pass the next function with a new object as argument which contain 9 attributes
         current 6 Input proprties by using the spread operator on input data argument
         + other propperties of the selected shipping country, subdivision and option
         why do we use next function here that is passed from AdressForm component:
         because we need to store in the state of Checkout component the shipping data which are passed from Checkout to the next step PaymentForm component
            */}
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {/* {console.log(Object.entries(shippingCountries))} array of arrays of key,value pairs */}
                {/* see console.log(countries) above */}
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          {/* a div with inline styles - we don't need to create a new style js file */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
