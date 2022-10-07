import React from 'react';
import { Center, Box, Stack, Spinner } from '@chakra-ui/react';
import { RoutineForm, RoutineComponent } from '../../organisms';
import { useProfile } from '../../../hooks/use-profile';

export default function Routine({ formReadOnly = true }) {
  const { routines } = useProfile();

  if (!routines) {
    return (
      <Center height={'100%'}>
        <Spinner size='xl' />
      </Center>
    );
  }
  return (
    <Center height={'100%'}>
      <RoutineForm />
      {/* <RoutineComponent routines={routines} /> */}
    </Center>
  );
}
