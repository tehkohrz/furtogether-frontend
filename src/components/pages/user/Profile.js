import React, { useState, useEffect } from 'react';
import { profileApi } from '../../../api/profile-api';
import { Spinner, Flex } from '@chakra-ui/react';
import HumanForm from '../../organisms/HumanForm';

const Profile = () => {
  // Auth Context for the uerId
  // Form state to load the initial values
  const [userProfile, setUserProfile] = useState(null);
  // Form Edit state
  const [formReadOnly, setFormReadOnly] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      // Get data from the backend server
      const response = await profileApi.getUserProfile();
      // throw error if search failed
      if (!response.success) {
        throw new Error('User profile not found.');
      }
      // Set form state to the retrieved data
      const data = response.data.userProfile;
      setUserProfile(data);
    };
    getUser();
  }, []);

  console.log('Profile inside', userProfile);
  // No profile loaded keep spinning
  if (!userProfile) {
    return <Spinner size='xl' />;
  }

  return (
    <Flex minH={'100vh'} align={'top'} justify={'center'}>
      <HumanForm formReadOnly={formReadOnly} userProfile={userProfile} />
    </Flex>
  );
};

export default Profile;
