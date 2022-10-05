import React from 'react';
import { Center, Box, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Button } from '../../atoms';
import { RoutineForm } from '../../organisms';

export default function Routine({ formReadOnly = true }) {
  return (
    <Center minH='`100%'>
      <RoutineForm />
    </Center>
  );
}
