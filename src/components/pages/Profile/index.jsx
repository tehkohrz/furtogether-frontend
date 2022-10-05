import React from 'react';
import { useProfile } from '../../../hooks/use-profile';
import { Spinner, Flex, Stack, Center } from '@chakra-ui/react';
import { HumanForm, DogComponent, Avatar } from '../../organisms';

const Profile = () => {
  const { user } = useProfile();
  // No profile loaded keep spinning
  if (!user) {
    return <Spinner size='xl' />;
  }

  // Add in column for name of image
  const url = '0.6139596752603851.jpg'
  
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
      <Avatar url={url}
    />
    </Center>
  );
};

export default Profile;
