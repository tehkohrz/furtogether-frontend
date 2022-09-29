import React, { useState } from 'react';
import { Button } from '../../atoms'
import { UserInput, PasswordInput } from '../../molecules'; 
import { Flex, Stack, Box, useColorModeValue, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import useUpdateLogger from '../../../hooks/useUpdateLogger'
import { authApi } from '../../../api/auth-api';
import { useAuth } from '../../../hooks/use-auth';

const Login = ({handleToggle}) => {

const navigate = useNavigate();
const { signIn } = useAuth()
const [loginMap, setLoginMap] = useState({
  username:"",
  password: "",
})

const formHandleChange = (input) => {
  const { name, value } = input.target
  setLoginMap({...loginMap, [name]: value})
}

const buttonHandleSubmit = async (event) => {
  // event.preventDefault()

  try {
    console.log('submit')
    console.log(loginMap)
    await signIn(loginMap.username, loginMap.password)


  } catch (error){
    console.error(error)
  }
    
}

const loginInputs = [
    {
      type: "text",
      name: "username",
      label: "Username",
      placeholder: "Enter username",
      // value: registerMap.username,
      onChange: [formHandleChange],
      // onChange : "",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      onChange: [formHandleChange],
      // onChange: "",
    },
  ]

  useUpdateLogger(loginMap)

  return (
    <>
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50','gray.800')}>
      <Stack spacing={8} mx={"auto"} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Welcome back
          </Text>
        </Stack>

        <Box 
          rounded={'lg'} 
          bg={useColorModeValue('white', 'gray.700')} 
          boxShadow={'lg'} 
          p={8}>
          <Stack spacing={4}>
            <UserInput type={loginInputs[0].type} name={loginInputs[0].name} placeholder={loginInputs[0].placeholder} label={loginInputs[0].label} onChange={loginInputs[0].onChange[0]}/>
            <PasswordInput type={loginInputs[1].type} name={loginInputs[1].name} placeholder={loginInputs[1].placeholder} label={loginInputs[1].label} onChange={loginInputs[1].onChange[0]}/>

          </Stack>

          <Stack spacing={10} pt={2}>
            <Button handleClick={buttonHandleSubmit} text="Login" size="md" bg={'blue.400'} color={'white'} _hover={{bg:'blue.500'}}/>
          </Stack>

          <Stack pt={5}>
            <Text align={'center'}>
              Dont have an account? Register <button style={{border: 'none', background: 'none', padding: '0'}} onClick={handleToggle}>here</button>
            </Text>
          </Stack>


        </Box>
      </Stack>
    </Flex>
    </>
  )
}

export default Login