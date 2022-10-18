import React from 'react';
import { Center, Box, Stack, Spinner, Text } from '@chakra-ui/react';
import { RoutineComponent } from '../../organisms';
import { useProfile } from '../../../hooks/use-profile';

export default function Routine({ formReadOnly = true }) {
  const { routines, dogs } = useProfile();
  console.log({ routines });
  if (!routines) {
    return (
      <Center height={'100%'}>
        <Spinner size='xl' />
      </Center>
    );
  }
  return (
    <Center height={'100%'}>
      <Stack w='80%'>
        <Text as='u' fontWeight='bold' fontSize='3rem' color='teal.400'>
          Your Routines
        </Text>
        <RoutineComponent routines={routines} dogs={dogs} />
      </Stack>
    </Center>
  );
}
