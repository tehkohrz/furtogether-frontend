import React from 'react';
import { Stack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import RoutineCard from './RoutineCard';
import AddRoutineCard from './AddRoutineCard';

export default function RoutineComponent({ routines }) {
  const routineCards = routines.map((routine, index) => {
    // Need to assign unique key so that when the card is deleted the context recognises which to
    // remove and the state to keep. UUID used to generate for empty cards
    const key = uuidv4();
    return <RoutineCard key={key} routine={routine} index={index} />;
  });
  return (
    <Stack direction={'column'} flexGrow='1' padding='10px' alignItems={'center'}>
      {routineCards}
      <AddRoutineCard />
    </Stack>
  );
}
