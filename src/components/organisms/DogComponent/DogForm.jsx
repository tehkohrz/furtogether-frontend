import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CloseButton, Stack, useToast } from '@chakra-ui/react';
import { Button, AppToast } from '../../atoms';
import InputField from '../../molecules/InputField';
import SelectField from '../../molecules/SelectField';
import { profileApi } from '../../../api/profile-api';
import { useProfile } from '../../../hooks/use-profile';

// Takes in one entry from the dog array to generate one dog form
export default function DogForm({ dogProfile, cardHandler, index }) {
  const { updateDog, deleteDog, dogs } = useProfile();

  // ?HANDLERS
  // Read only toggle for the form
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
      const updatedDogProfile = {
        id: dogProfile.id,
        userId: dogProfile.userId,
        ...values,
      };
      console.log(updatedDogProfile);
      const success = await updateDog(updatedDogProfile, index);
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not update ${dogProfile.dog}'s profile.`);
      }
      // Feedback Toast
      toggleReadOnly();
      feedBack.success(updatedDogProfile.dog);
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  async function handleDelete() {}

  // ?FORM Attributes
  // Initalise the initial values for formik
  const initialValues = {};
  formArray.forEach(
    (x) => (initialValues[x.fieldName] = dogProfile[x.fieldName])
  );
  // Genertates and array of jsx for form fields
  const FormFields = generateFields(formArray, formReadOnly);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSave}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Stack direction={'column'}>
              {/* each input field */}
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
      <CloseButton size='md' onClick={cardHandler} />
      {/* <AppToast /> */}
    </>
  );
}

// Fields that are to be in the form
const formArray = [
  {
    label: 'Name',
    fieldName: 'dog',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Gender',
    fieldName: 'gender',
    placeHolder: '',
    validateFn: null,
    type: 'select',
    options: [
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' },
    ],
  },
  {
    label: 'Breed',
    fieldName: 'breed',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Age',
    fieldName: 'age',
    placeHolder: '',
    validateFn: null,
    type: 'input',
    addOns: {
      right: 'Years',
    },
  },
  {
    label: 'Weight',
    fieldName: 'weight',
    placeHolder: '',
    validateFn: null,
    type: 'input',
    addOns: {
      right: 'KG',
    },
  },
];

function generateFields(array, formReadOnly) {
  const fields = array.map((x) => {
    if (x.type == 'input') {
      return (
        <InputField
          readOnly={formReadOnly}
          key={x.label}
          placeHolder={x.placeHolder}
          validateFn={x.validateFn}
          fieldName={x.fieldName}
          label={x.label}
          addOns={x.addOns ? x.addOns : {}}
        />
      );
    }
    if (x.type == 'select') {
      return (
        <SelectField
          readOnly={formReadOnly}
          key={x.label}
          fieldName={x.fieldName}
          options={x.options}
          label={x.label}
          placeHolder={x.placeHolder}
        />
      );
    }
  });
  return fields;
}

// TOAST MESSAGES
const feedBack = {
  success: (name) => {
    AppToast({
      title: 'Saved!',
      description: `${name}'s profile was updated.`,
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
