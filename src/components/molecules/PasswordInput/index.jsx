import React, { useState } from 'react';
import { TextInput, Button } from '../../atoms'
import { InputGroup, InputRightAddon, FormControl, FormLabel, InputRightElement,  } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

const PasswordInput = ({type, name, placeholder, label, value, onChange}) => {

  const [showPassword, setShowPassword] = useState(false)

  const handleClick = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  return (
    <>
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <TextInput type={showPassword ? 'text' : type} name= {name} placeholder= {placeholder} label= {label} value={value} onChange={onChange} />
        <InputRightElement>
          <Button variant={'ghost'} handleClick= {handleClick} text={showPassword ? <ViewIcon/> : <ViewOffIcon/>}>
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    </>
  )
}

export default PasswordInput