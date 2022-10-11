// import { ReactNode } from 'react';
import React from 'react';
import logo from '../../../assets/logo.svg';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

// Auth
import { useAuth } from '../../../hooks/use-auth';

// Google Auth
import { googleLogout } from '../../../services/firebase.service';

// Edit here for the links
const Links = [
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Login',
    link: '/signin',
  },
  {
    name: 'Friends',
    link: '/friends',
  },
  {
    name: 'HotSpots',
    link: '/hotspots',
  },
  {
    name: 'My Info',
    link: '/profile',
  },
  {
    name: 'Routines',
    link: '/routines',
  },
  {
    name: 'Photo Album',
    link: '/profilerichie',
  },
];

const NavLink = ({ children, href, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
    onClick={onClick}
  >
    {children}
  </Link>
);

function Navbar() {
  // Logout
  const { logout, isAuthenticated } = useAuth();
  console.log('isAuth: ', isAuthenticated);

  const handleLogout = async () => {
    try {
      logout();
      googleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <img src={logo} width='40px' height='40px' alt='' />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    {isAuthenticated ? (
                      <NavLink onClick={handleLogout}>Sign Out</NavLink>
                    ) : (
                      <NavLink href={'/signin'}>Login</NavLink>
                    )}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} href={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}

export default Navbar;
