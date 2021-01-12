import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

/**
 * this is a customed TextField material-ui component that will be used 
 * many times in AddressForm component 6 times (see FormInput in other component)
 * The state is automatically managed when we click submit on the form !!
 * 
 * custom component is useful to simplify the code in parent components
 */
function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
}

export default FormInput;
