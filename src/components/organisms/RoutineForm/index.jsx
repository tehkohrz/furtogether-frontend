import React, { useState } from 'react';
import { Center, Box, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Button } from '../../atoms';
import { formArray, generateRoutineFields } from './formFunction';

export default function RoutineForm(routineDetails) {
  // ?HANDLERS
  // ReadOnly handler
  const [formReadOnly, setFormReadOnly] = useState(true);
  // Auto open for new form
  // if (!routineDetails.id) {
  //   setFormReadOnly(false);
  // }
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }
  // !Runs Save entry API for routine
  async function handleSave(values, actions) {
    console.log({ ...values });
    // try {
    //   const updatedProfile = {
    //     ...values,
    //   };
    //   // !Add an addtional attribute here for a new form to check and change api call
    //   const success = await updateUser(updatedProfile);
    //   // Respond with toast for feedback
    //   if (!success) {
    //     throw new Error(`Could not update your profile.`);
    //   }
    //   // Feedback Toast
    //   toggleReadOnly();
    //   feedBack.success();
    // } catch (err) {
    //   // change form back to readOnly and update the card rendering
    //   feedBack.error(err);
    //}
  }

  // ?FORM ATTRIBUTE
  // Initalise the initial values for formik
  const initialValues = {};
  formArray.forEach((x) => {
    initialValues[x.fieldName] = routineDetails[x.fieldName] || '';
  });
  console.log({ initialValues });
  const FormFields = generateRoutineFields(formArray, formReadOnly);
  return (
    <Center minH='`100%' minW='50%'>
      <Box flex='1'>
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {(props) => (
            <Form>
              <Stack direction={'column'}>
                {FormFields}
                {formReadOnly ? (
                  <Button handleClick={toggleReadOnly} text='Edit' />
                ) : (
                  <Stack direction={'row'}>
                    <Button
                      handleClick={props.submitForm}
                      text='Save'
                      bg='green'
                    />
                    <Button
                      handleClick={props.handleReset}
                      text='Reset'
                      bg='salmon'
                    />
                    {/* <Button handleClick={deleteHandler} text='Delete' bg='red' /> */}
                  </Stack>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
