import React from 'react'
import { Box, Input, FormControl, FormLabel,} from '@chakra-ui/react'


const TextInput = ({value, setValue, label, type, name, placeholder, onChange, variant }) => {

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
      <Input value={value} onChange={(e) => onChange(e)} name={name} type= {type} placeholder={placeholder} variant={variant}/>
    </>
  )
}

export default TextInput