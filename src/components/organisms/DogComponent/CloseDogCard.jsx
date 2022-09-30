import React from 'react';
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ClosedDogCard({
  cardHandler,
  dogProfile = { name: 'test' },
}) {
  return (
    <Center py={6} onClick={cardHandler}>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w={{ sm: '100%', md: '540px' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        height={{ sm: '476px', md: '10rem' }}
        boxShadow={'2xl'}
        padding={4}
        flex={1}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />

        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {dogProfile.dog}
        </Heading>
      </Stack>
    </Center>
  );
}
