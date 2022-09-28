import React from 'react';
import { TextInput } from '../../atoms'
import { FormControl,FormLabel, FormHelperText, Stack } from '@chakra-ui/react';

const UserInput = ({type, name, placeholder, label, onChange, variant, errorMsg, direction}) => {

  return (
    <>
    <FormControl>
    <Stack direction={direction}>
    <FormLabel>{label}</FormLabel>
      <TextInput type={type} name= {name} placeholder= {placeholder} label= {label} onChange={onChange} variant={variant}/>
      {errorMsg ? <FormHelperText> {errorMsg} </FormHelperText> : null}
    </Stack>
    </FormControl>
    </>
  )
}

export default UserInput