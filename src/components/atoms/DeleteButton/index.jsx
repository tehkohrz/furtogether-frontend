import React from 'react';
import { Button } from '@chakra-ui/react'

function DeleteButton({handleClick, text, variant, size, bg, color, _hover, disabled, rowTag}) {


  return (
    <>
    {/* {disabled ? <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover} disabled> {text} </Button> : <Button variant={variant} onClick={handleClick} size={size} bg={bg} color={color} _hover = {_hover}> {text} </Button>
    } */}
    <Button variant={variant} onClick={()=> {handleClick(rowTag)}} size={size} bg={bg} color={color} _hover = {_hover} disabled = {disabled}> {text} </Button>
    </>
  )
}

export default DeleteButton