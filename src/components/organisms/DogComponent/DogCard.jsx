import React, { useState } from 'react';
import ClosedDogCard from './CloseDogCard';
import DogForm from './DogForm';

export default function DogCard({ dogProfile, index }) {
  const [cardOpen, setCardOpen] = useState(dogProfile ? false : true);
  const cardClickHandler = () => {
    setCardOpen(!cardOpen);
  };

  // card not not open generate the avatar card
  if (!cardOpen) {
    return <ClosedDogCard cardHandler={cardClickHandler} dogProfile={dogProfile} />;
  }
  // card is open generate the form
  if (cardOpen) {
    return <DogForm dogProfile={dogProfile} cardHandler={cardClickHandler} index={index} />;
  }
}
