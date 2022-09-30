import React from 'react';
import { Button } from '@chakra-ui/react'

function Button1({handleClick, text, variant, size, bg, color, _hover, disabled}) {

  return (
    <>
    {/* {disabled ? <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover} disabled> {text} </Button> : <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover}> {text} </Button>
    } */}
    <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover} disabled = {disabled}> {text} </Button>
    </>
  )
}

export default Button1