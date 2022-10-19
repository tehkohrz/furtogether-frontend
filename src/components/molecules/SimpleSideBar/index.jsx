import React from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';

const SimpleSideBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();


  const SidebarContent = ({onClose, ...rest}) => {

    return (
      <>
      <p> Lol </p>
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
    </Box>
    
      </>
    )
  }

  return (
    <>
    <Box>
      <p> Test </p>
    </Box>
    </>
  )
}

export default SimpleSideBar