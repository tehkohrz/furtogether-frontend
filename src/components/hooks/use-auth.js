import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

export const useAuth = () => useContext(AuthContext);

// Hook name
// useAuth()
// Methods: signIn, logout, reAuth,
// Properties:
// isAuthenticated {bool}
// isInitialized {bool}
// user {object} - user.username{string} - user.user_id{string}
