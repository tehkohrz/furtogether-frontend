import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/use-profile';
import DogCard from './DogCard';

export default function DogComponent({ formReadOnly, dogsArr }) {
  const dogCards = dogsArr.map((dog, index) => {
    return (
      <DogCard
        formReadOnly={formReadOnly}
        key={dog.id}
        dogProfile={dog}
        index={index}
      />
    );
  });
  return dogCards;
}
