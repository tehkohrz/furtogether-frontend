import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Stack, Box } from '@chakra-ui/react';
import { Button, AppToast } from '../../atoms';
import { formArray, generateFields } from './formFunction';
import { useProfile } from '../../../hooks/use-profile';

export default function HumanForm({ userProfile }) {
  const { updateUser } = useProfile();

  // ?HANDLERS
  const [formReadOnly, setFormReadOnly] = useState(true);
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }

  // Runs Save entry API for dog profile
  async function handleSave(values, actions) {
    try {
      const updatedProfile = {
        ...values,
      };
      const success = await updateUser(updatedProfile);
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not update your profile.`);
      }
      // Feedback Toast
      toggleReadOnly();
      feedBack.success();
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  // ?FORM ATTRIBUTE
  // Initalise the initial values for formik
  const initialValues = {};
  formArray.forEach((x) => (initialValues[x.fieldName] = userProfile[x.fieldName]));
  const FormFields = generateFields(formArray, formReadOnly);

  return (
    <Box flex='1' w='80%'>
      <Formik initialValues={initialValues} onSubmit={handleSave}>
        {(props) => (
          <Form>
            <Stack direction={'column'}>
              {FormFields}
              {formReadOnly ? (
                <Button handleClick={toggleReadOnly} text='Edit' />
              ) : (
                <Stack direction={'row'}>
                  <Button handleClick={props.submitForm} text='Save' bg='green' />
                  <Button handleClick={props.handleReset} text='Reset' bg='salmon' />
                  {/* <Button handleClick={deleteHandler} text='Delete' bg='red' /> */}
                </Stack>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

// TOAST MESSAGES
const feedBack = {
  success: () => {
    AppToast({
      title: 'Saved!',
      description: `Your profile was updated.`,
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
    });
  },
  error: (err) => {
    AppToast({
      title: 'Try again!',
      description: err.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
    });
  },
};
