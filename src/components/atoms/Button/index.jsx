import React from 'react';
import { Button } from '@chakra-ui/react'

function Button1({handleClick, text, variant, size, bg, color, _hover, disabled, leftIcon}) {

  return (
    <>
    {/* {disabled ? <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover} disabled> {text} </Button> : <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover}> {text} </Button>
    } */}
    <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover} disabled = {disabled} leftIcon={leftIcon}> {text} </Button>
    </>
  )
}

export default Button1