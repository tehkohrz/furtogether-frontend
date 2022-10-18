import React, { useState, useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { useProfile } from '../../../hooks/use-profile';
import { v4 as uuidv4 } from 'uuid';
import DogCard from './DogCard';
import AddDogCard from './AddDogCard';

export default function DogComponent({ dogs }) {
  const dogCards = dogs.map((dog, index) => {
    // Need to assign unique key so that when the card is deleted the context recognises which to
    // remove and the state to keep. UUID used to generate for empty cards
    const key = uuidv4();
    return <DogCard key={key} dogProfile={dog} index={index} />;
  });
  return (
    <Stack direction={'column'} w='80%'>
      {dogCards}
      <AddDogCard />
    </Stack>
  );
}
