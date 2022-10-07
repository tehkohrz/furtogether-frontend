import React from 'react';
import {
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ClosedRoutineCard({ cardHandler, routine }) {
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
        <Heading as='u' fontSize={'2xl'} fontFamily={'body'} color='blue.600'>
          {routine.name}
        </Heading>
        {/* TEXT for more routine details */}
        <HStack>
          {routine.dogs.map((dog) => (
            <Text key={dog.id}>{dog.name}</Text>
          ))}
        </HStack>
        <HStack>
          <Text as='b' fontSize={'md'}>
            Start Time :
          </Text>
          <Text>{routine.startTime}</Text>
        </HStack>
        <HStack>
          <Text as='b' fontSize={'md'}>
            End Time :
          </Text>
          <Text>{routine.endTime}</Text>
        </HStack>
      </Stack>
    </Center>
  );
}
