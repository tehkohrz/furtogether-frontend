import React from 'react';
import { createStandaloneToast, useToast } from '@chakra-ui/react';

export default function AppToast(toastProps) {
  const { toast, ToastContainer } = createStandaloneToast();
  return toast(toastProps);
}
