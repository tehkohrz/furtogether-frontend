import React, { useState } from 'react';
import ClosedDogCard from './CloseDogCard';
import DogForm from './DogForm';
import NewDogForm from './NewDogForm';

export default function DogCard({ dogProfile, index }) {
  const [cardOpen, setCardOpen] = useState(dogProfile.id ? false : true);
  console.log(index, { dogProfile });
  const cardClickHandler = () => {
    setCardOpen(!cardOpen);
  };

  // card not not open generate the avatar card
  if (!cardOpen) {
    return (
      <ClosedDogCard cardHandler={cardClickHandler} dogProfile={dogProfile} />
    );
  }
  // card is open generate the form
  if (cardOpen) {
    if (dogProfile.id) {
      return (
        <DogForm
          dogProfile={dogProfile}
          cardHandler={cardClickHandler}
          index={index}
        />
      );
    } else {
      return (
        <NewDogForm
          dogProfile={dogProfile}
          cardHandler={cardClickHandler}
          index={index}
        />
      );
    }
  }
}
