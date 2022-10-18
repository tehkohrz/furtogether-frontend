import React, { useState } from 'react';
import { CloseButton, Box, Stack, Input, FormLabel, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Button, AppToast } from '../../atoms';
import { formTemplate, generateRoutineFields } from './formFunction';
import { MapInput } from '../../organisms';
import Geocode from 'react-geocode';
import { useProfile } from '../../../hooks/use-profile';

Geocode.setLanguage('en');
Geocode.setRegion('sgp');
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export default function RoutineForm({ routine = null, cardHandler, index }) {
  const { dogs, updateRoutine, saveNewRoutine, deleteRoutine } = useProfile();

  // ?HANDLERS
  // ReadOnly handler
  const [formReadOnly, setFormReadOnly] = useState(routine ? true : false);
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }

  // Postal Code search input for map
  // sets map center to currently selected location if it is populated
  const [mapCenter, setMapCenter] = useState(
    routine?.position || { lat: 1.2983000336922557, lng: 103.82741106870155 }
  );
  async function mapCenterChange(event) {
    const newPostal = event.target.value;
    const { results } = await Geocode.fromAddress(String(newPostal));
    // Gets the lat and long
    const newMapCenter = results[0].geometry.location;
    setMapCenter(newMapCenter);
  }

  // Marker Handler to set locationId for form
  const [locationId, setLocationId] = useState(routine?.locationId || null);

  // Save handler for routine
  async function handleSave(values, actions) {
    try {
      const updatedRoutine = {
        id: routine?.id,
        ...values,
        locationId,
      };
      console.log({ updatedRoutine });
      // Checking if this is a new form and change API call
      let success = false;
      // Id exist run the update API
      if (updatedRoutine.id) {
        success = await updateRoutine(updatedRoutine);
      } else {
        success = await saveNewRoutine(updatedRoutine, index);
      }
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not update the routine.`);
      }
      // Feedback Toast
      toggleReadOnly();
      feedBack.success(updateRoutine.name);
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  // Delete Handler
  async function deleteHandler() {
    try {
      const routineId = routine?.id;
      const success = await deleteRoutine(routineId, index);
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not delete the routine.`);
      }
      if (routineId) {
        feedBack.deleted();
      }
    } catch (err) {
      feedBack.error(err);
    }
  }

  // ?FORM ATTRIBUTES
  // Initalise the initial values for formik
  const initialValues = {};
  const form = { ...formTemplate };
  // Set the dog options for all dogs owned by user
  form.routineDogs.options = dogs.map((dog) => {
    return { value: dog.id, label: dog.dog };
  });
  // Set the dogs that are checke for this routine if it exist
  form.routineDogs.checked = routine?.routineDogs.map((dog) => dog.id);

  //Set days that are checked for this routine
  form.days.checked = routine?.days;

  Object.keys(form).forEach((x) => {
    initialValues[x] = routine ? routine[x] : '';
  });
  const FormFields = generateRoutineFields(form, formReadOnly);

  return (
    <Flex w='80vh' grow='1'>
      <Box flex='1'>
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {(props) => (
            <Form>
              <Stack direction={'column'}>
                {FormFields}
                <FormLabel>Routine Location</FormLabel>
                <Input
                  type='number'
                  onBlur={mapCenterChange}
                  placeholder='Search for a location by postal code'
                  defaultValue={routine && routine.locationPostal}
                />

                <MapInput setLocation={setLocationId} location={locationId} center={mapCenter} />
                {formReadOnly ? (
                  <Button handleClick={toggleReadOnly} text='Edit' />
                ) : (
                  <Stack direction={'row'}>
                    <Button handleClick={props.submitForm} text='Save' bg='green' />
                    <Button handleClick={props.handleReset} text='Reset' bg='salmon' />
                    <Button handleClick={deleteHandler} text='Delete' bg='red' />
                  </Stack>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <CloseButton size='md' onClick={routine ? cardHandler : deleteHandler} />
    </Flex>
  );
}

// TOAST MESSAGES
const feedBack = {
  success: (name) => {
    AppToast({
      title: 'Saved!',
      description: `Routine ${name} was updated.`,
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
  deleted: () => {
    AppToast({
      title: 'Deleted!',
      description: 'Routine was deleted.',
      status: 'Success',
      position: 'bottom-right',
      duration: 5000,
    });
  },
};
