import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useAuth } from './hooks/use-auth';
import { Navbar, PhotoAlbum } from './components/organisms';
import { Registration, Home, Profile, Map } from './components/pages';
import { ProfileProvider } from './contexts/profile-context';
import { ProfileTab } from './components/pages'

import theme from './components/theme';

const routes = [
  {
    // path: '/login',
    path: '/signin',
    element: <Registration />,
  },
  {
    path: '/profilerichie',
    element: <PhotoAlbum />,
  },
  {
    path: '/walk/map',
    element: <Map />,
  },
  {
    path: '/testing',
    element: <ProfileTab/>,
  }
];

const authenticatedRoutes = [
  {
    path: '/profile',
    element: (
      <ProfileProvider>
        <ProfileTab />
      </ProfileProvider>
    ),
  },
  // {
  //   path: '/addstudent',
  //   element: <AddStudent />,
  // },
  //   {
  //   path: '/attendance',
  //   element: <Attendance />,
  // },
];

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log('isAuthenticated: ', isAuthenticated);
  if (!isAuthenticated) {
    // write path of sign-in page here instead of '/'
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={null}>
        <Navbar />
        <Router basename='/'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route}
                path={route.path}
                element={route.element}
              ></Route>
            ))}
            {authenticatedRoutes.map((route) => (
              <Route
                key={route}
                path={route.path}
                exact
                element={<RequireAuth>{route.element}</RequireAuth>}
              />
            ))}
          </Routes>
        </Router>
      </React.Suspense>
    </ChakraProvider>
  );
}

export default App;
