import React, { useEffect, useState } from 'react';
import { useProfile } from '../../../hooks/use-profile';
import { Spinner, Flex, Stack, Center, Text, Box } from '@chakra-ui/react';
import { HumanForm, DogComponent, Avatar } from '../../organisms';
import { profileApi } from '../../../api/profile-api';

const Profile = () => {
  const { user, dogs } = useProfile();
  // No profile loaded keep spinning
  if (!user) {
    return <Spinner size='xl' />;
  }

  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchPicture = async () => {
      // Get the data from database
      const profileRetrieve = await profileApi.retrieveAvatar();
      const avatar = profileRetrieve['data']['avatar_url'];
      setUrl(avatar);
    };

    fetchPicture();
  }, []);

  return (
    <Center h='`100%'>
      <Stack w='80%'>
        <Text as='u' fontWeight='bold' fontSize='3rem' color='teal.400'>
          Your Profile
        </Text>
        <Box justify={'center'} align={'center'}>
          <Avatar url={url} />
        </Box>
        <Flex align={'top'} justify={'center'} width={'100%'}>
          <HumanForm userProfile={user} />
        </Flex>
        <Text as='u' fontWeight='bold' fontSize='3rem' color='teal.400'>
          Dogs
        </Text>
        <Flex align={'top'} justify={'center'}>
          <DogComponent dogs={dogs} />
        </Flex>
      </Stack>
    </Center>
  );
};

export default Profile;
