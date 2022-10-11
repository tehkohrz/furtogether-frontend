import React from 'react';
import { Center, Box, Stack, Spinner } from '@chakra-ui/react';
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
      <RoutineComponent routines={routines} dogs={dogs} />
    </Center>
  );
}
