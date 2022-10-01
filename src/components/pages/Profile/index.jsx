import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/use-profile';
import { Spinner, Flex, Stack, Center } from '@chakra-ui/react';
import HumanForm from '../../organisms/HumanForm';
import DogComponent from '../../organisms/DogComponent';

const Profile = () => {
  // Form Edit state
  const [formReadOnly, setFormReadOnly] = useState(true);

  // useEffect(() => {
  //   const getUser = async () => {
  //     // Get data from the backend server
  //     const response = await profileApi.getUserProfile();
  //     // throw error if search failed
  //     if (!response.success) {
  //       throw new Error('User profile not found.');
  //     }
  //     // Set form state to the retrieved data
  //     const data = response.data.userProfile;
  //     setUserProfile(data);
  //     setDogsArr(data.dogs);
  //   };
  //   getUser();
  // }, []);
  const { user, dogs } = useProfile();
  console.log(user, dogs);
  // No profile loaded keep spinning
  if (!user && !dogs) {
    return <Spinner size='xl' />;
  }

  return (
    <Center minH='`100%'>
      <Stack>
        <Flex align={'top'} justify={'center'} width={'100%'}>
          <HumanForm formReadOnly={formReadOnly} userProfile={user} />
        </Flex>

        <Flex align={'top'} justify={'center'}>
          <DogComponent formReadOnly={formReadOnly} dogsArr={dogs} />
        </Flex>
      </Stack>
    </Center>
  );
};

export default Profile;
