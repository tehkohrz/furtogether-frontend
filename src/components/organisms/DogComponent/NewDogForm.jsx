import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CloseButton, Stack, Flex, Box } from '@chakra-ui/react';
import { Button, AppToast } from '../../atoms';
import { generateFields, formArray } from './formFunction';
import { useProfile } from '../../../hooks/use-profile';

// Takes in one entry from the dog array to generate one dog form
export default function DogForm({ dogProfile, cardHandler, index }) {
  const { saveNewDog, deleteDog } = useProfile();

  // ?HANDLERS
  // Read only toggle for the form
  const [formReadOnly, setFormReadOnly] = useState(false);
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }

  // Runs Save entry API for dog profile
  async function handleSave(values, actions) {
    try {
      const newDogProfile = {
        ...values,
      };
      console.log({ newDogProfile });
      const success = await saveNewDog(newDogProfile, index);
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not save profile.`);
      }
      // Feedback Toast
      feedBack.success(newDogProfile.dog);
      toggleReadOnly();
      cardHandler();
    } catch (err) {
      console.log(err);
    }
  }

  // Delete the dog card
  async function handleDelete() {
    try {
      const success = await deleteDog(null, index);
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  // ?FORM ATTRIBUTE
  // Initalise the initial values for formik
  const initialValues = {};

  // Genertates and array of jsx for form fields
  const FormFields = generateFields(formArray, formReadOnly);

  return (
    <Flex>
      <Box flex='1'>
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Stack direction={'column'}>
                {/* each input field */}
                {FormFields}
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
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <CloseButton size='md' onClick={handleDelete} />
    </Flex>
  );
}

// TOAST MESSAGES
const feedBack = {
  success: (name) => {
    AppToast({
      title: 'Saved!',
      description: `Profile created`,
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
    });
  },
};
