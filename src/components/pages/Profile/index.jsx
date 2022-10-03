import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/use-profile';
import { Spinner, Flex, Stack, Center } from '@chakra-ui/react';
import HumanForm from '../../organisms/HumanForm';
import DogComponent from '../../organisms/DogComponent';

const Profile = () => {
  const { user } = useProfile();
  console.log('Profile Load', user);
  // No profile loaded keep spinning
  if (!user) {
    return <Spinner size='xl' />;
  }

  return (
    <Center minH='`100%'>
      <Stack>
        <Flex align={'top'} justify={'center'} width={'100%'}>
          <HumanForm userProfile={user} />
        </Flex>

        <Flex align={'top'} justify={'center'}>
          <DogComponent />
        </Flex>
      </Stack>
    </Center>
  );
};

export default Profile;
