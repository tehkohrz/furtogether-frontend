import React from 'react';
import { useProfile } from '../../../hooks/use-profile';
import { Spinner, Flex, Stack, Center, Text } from '@chakra-ui/react';
import { HumanForm, DogComponent, Avatar } from '../../organisms';

const Profile = () => {
  const { user } = useProfile();
  // No profile loaded keep spinning
  if (!user) {
    return <Spinner size='xl' />;
  }

  // Add in column for name of image
  const url = '0.6139596752603851.jpg';

  return (
    <Center h='`100%'>
      <Stack w='80%'>
        <Text as='u' fontWeight='bold' fontSize='3rem' color='teal.400'>
          Your Profile
        </Text>
        <Flex align={'top'} justify={'center'} width={'100%'}>
          <HumanForm userProfile={user} />
        </Flex>
        <Text as='u' fontWeight='bold' fontSize='3rem' color='teal.400'>
          Dogs
        </Text>
        <Flex align={'top'} justify={'center'}>
          <DogComponent />
        </Flex>
      </Stack>
      <Avatar url={url} />
    </Center>
  );
};

export default Profile;
