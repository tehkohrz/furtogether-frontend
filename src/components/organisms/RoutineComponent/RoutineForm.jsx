import React, { useState } from 'react';
import { Center, Box, Stack, Input, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Button } from '../../atoms';
import { formArray, generateRoutineFields } from './formFunction';
import { MapInput } from '../MapInput';
import Geocode from 'react-geocode';

Geocode.setLanguage('en');
Geocode.setRegion('sgp');
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export default function RoutineForm({ routine, cardHandler, index }) {
  // ?HANDLERS
  // ReadOnly handler
  const [formReadOnly, setFormReadOnly] = useState(true);
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }
  // Postal Code search input for map
  const [mapCenter, setMapCenter] = useState(undefined);
  async function mapCenterChange(event) {
    const newPostal = event.target.value;
    const { results } = await Geocode.fromAddress(String(newPostal));
    // Gets the lat and long
    const newMapCenter = results[0].geometry.location;
    setMapCenter(newMapCenter);
  }
  // Marker Handler to set locationId for form
  const [locationId, setLocationId] = useState(null);

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

  // ?FORM ATTRIBUTES
  // Initalise the initial values for formik
  const initialValues = {};
  console.log({ routine });
  formArray.forEach((x) => {
    initialValues[x.fieldName] = routine[x.fieldName] || '';
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
                <FormLabel>Routine Location</FormLabel>
                <Input type='number' onBlur={mapCenterChange} />
                {/* <MapInput
                  setLocation={setLocationId}
                  location={locationId}
                  center={mapCenter}
                /> */}
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
