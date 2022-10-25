import React, { useState, useEffect } from 'react';
import { Button } from '../../atoms';
import { UserInput, PasswordInput, ValidationChecks } from '../../molecules';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useColorModeValue,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';
import useUpdateLogger from '../../../hooks/useUpdateLogger';
// import { signUpAPI } from '../../../api/signUp';
// import { addMemberAPI } from '../../../api/addMember';

// submit data to DB
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({ handleToggle }) => {
  const navigate = useNavigate();

  const [registerMap, setRegisterMap] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    postal: '',
    address: '',
    gender: '',
  });

  const [errorMap, setErrorMap] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const formHandleChange = (input) => {
    const { name, value } = input.target;
    setRegisterMap({ ...registerMap, [name]: value });
  };

  const buttonHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://furtogether.fly.dev/sign-up', registerMap);
      console.log('register map: ', registerMap);

      if (registerMap) {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useUpdateLogger(registerMap);

  const userInputs = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      value: registerMap.name,
      onChange: [formHandleChange],
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      value: registerMap.email,
      onChange: [formHandleChange],
    },
    {
      type: 'text',
      name: 'postal',
      label: 'Postal',
      placeholder: 'Enter postcode',
      value: registerMap.postal,
      onChange: [formHandleChange],
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Enter address',
      value: registerMap.address,
      onChange: [formHandleChange],
    },
    {
      type: 'text',
      name: 'gender',
      label: 'Gender',
      placeholder: 'Enter gender',
      value: registerMap.gender,
      onChange: [formHandleChange],
    },
  ];

  const passwordFormats = [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      onChange: [formHandleChange],
    },
    {
      type: 'password',
      name: 'password2',
      label: 'Confirm password',
      placeholder: 'Enter password',
      onChange: [formHandleChange],
    },
  ];

  // Password Validation
  const specialCharactersArr = [
    '!',
    '#',
    '$',
    '%',
    '&',
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '[',
    ']',
    '^',
    '_',
    '`',
    '{',
    '|',
    '}',
    '~',
  ];

  //length, upper, low, numsymbol
  const [lengthPass, setLengthPass] = useState(false);
  const [upperCasePass, setUpperCasePass] = useState(false);
  const [lowerCasePass, setLowerCasePass] = useState(false);
  // const [numSymbolPass, setNumSymbolPass] = useState(false);

  useEffect(() => {
    checkPassword(registerMap.password);
  }, [registerMap.password]);

  const checkPassword = (password) => {
    password = password.toString();

    if (password.length >= 8) {
      setLengthPass(true);
    }

    if (password.match(/(?=.*[A-Z])/)) {
      setUpperCasePass(true);
    }

    if (password.match(/(?=.*[a-z])/)) {
      setLowerCasePass(true);
    }

    if (password.length <= 7) {
      setLengthPass(false);
    }

    if (!password.match(/(?=.*[A-Z])/)) {
      setUpperCasePass(false);
    }
    if (!password.match(/(?=.*[a-z])/)) {
      setLowerCasePass(false);
    }
  };

  console.log(`${lengthPass},${upperCasePass},${lowerCasePass}`);

  function validateInfo(values) {
    let errors = {};

    if (!values.name) {
      errors.username = 'Name required';
    }

    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email address is invalid!';
    }

    if (!values.password) {
      errors.password = 'Password required';
    }

    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Password should match ';
    }

    return errors;
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Get started with us today ✌️
          </Text>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            {/* Username & Email input box */}
            {userInputs.map((userInput, index) => (
              <div key={index}>
                <UserInput
                  type={userInput.type}
                  name={userInput.name}
                  placeholder={userInput.placeholder}
                  label={userInput.label}
                  value={userInput.value}
                  onChange={userInput.onChange[0]}
                />
              </div>
            ))}

            {/* Password and 2nd password input box */}
            {passwordFormats.map((passwordFormat, index) => (
              <div key={index}>
                <PasswordInput
                  type={passwordFormat.type}
                  name={passwordFormat.name}
                  placeholder={passwordFormat.placeholder}
                  label={passwordFormat.label}
                  value={passwordFormat.value}
                  onChange={passwordFormat.onChange[0]}
                />
              </div>
            ))}

            <Stack>
              <ValidationChecks
                pass={lengthPass}
                checkWords='Length of password at least 8 characters'
              />
              <ValidationChecks
                pass={upperCasePass}
                checkWords='Password contains 1 Uppercase'
              />
              <ValidationChecks
                pass={lowerCasePass}
                checkWords='Password contains 1 Lowercase'
              />
            </Stack>

            <Stack spacing={10} pt={2}>
              <Button
                handleClick={buttonHandleSubmit}
                text='Submit'
                size='lg'
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              />
            </Stack>

            <Stack pt={2}>
              <Text align={'center'}>
                Already a user? Login{' '}
                <button
                  style={{ border: 'none', background: 'none', padding: '0' }}
                  onClick={handleToggle}
                >
                  here
                </button>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
