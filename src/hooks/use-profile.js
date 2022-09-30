import { useContext } from 'react';
import { ProfileContext } from '../contexts/profile-context';

export const useProfile = () => useContext(ProfileContext);
