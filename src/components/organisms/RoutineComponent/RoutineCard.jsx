import React, { useState } from 'react';
import ClosedRoutineCard from './CloseRoutineCard';
import RoutineForm from './RoutineForm';

export default function RoutineCard({ routine, index }) {
  const [cardOpen, setCardOpen] = useState(routine ? false : true);
  const cardClickHandler = () => {
    setCardOpen(!cardOpen);
  };

  // card not not open generate the avatar card
  if (!cardOpen) {
    return <ClosedRoutineCard cardHandler={cardClickHandler} routine={routine} />;
  }
  // card is open generate the form
  if (cardOpen) {
    return <RoutineForm routine={routine} cardHandler={cardClickHandler} index={index} />;
  }
}
