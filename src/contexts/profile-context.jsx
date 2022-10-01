/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { profileApi } from '../api/profile-api';

// single source of truth,
const ActionType = {
  INITIALIZE: 'INITIALIZE',
  UPDATEDOG: 'UPDATEDOG',
  DELETEDOG: 'DELETEDOG',
  UPDATEUSER: 'UPDATEUSER',
};

const initialState = {
  isInitialized: false,
  user: null,
  dogs: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isInitialized, dogs, user } = action.payload;

    return {
      ...state,
      isInitialized: true,
      user,
      dogs,
    };
  },

  UPDATEDOG: (state, action) => {
    const { updatedDog, index } = action.payload;
    let newDogs = state.dogs;
    newDogs[index] = updatedDog;
    return {
      ...state,
      dogs: newDogs,
    };
  },

  DELETEDOG: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  UPDATEUSER: (state) => ({
    ...state,
    isAuthenticated: false,
    user: {
      firstName: '',
      lastName: '',
    },
  }),
};

// if action.type exists, then call the handler function with the same name, else just return the current state
// we get the action.type from dispatch functions (see below)
const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const ProfileContext = createContext({
  ...initialState,
  updateDog: () => Promise.resolve(),
  deleteDog: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
});

export const ProfileProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        let { success, data } = await profileApi.getUserProfile();
        if (success) {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isInitialized: true,
              user: data.userProfile,
              dogs: data.userProfile.dogs,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isInitialized: false,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    initialize();
  }, []);

  const updateDog = async (updatedDogProfile, index) => {
    const { success, data } = await profileApi.updateDogProfile(
      updatedDogProfile
    );
    if (success) {
      dispatch({
        type: ActionType.UPDATEDOG,
        payload: {
          index,
          updatedDog: updatedDogProfile,
        },
      });
      return true;
    } else {
      return new Error('Update failed');
    }
  };

  const deleteDog = async (dogProfile, index) => {
    const { success } = await profileApi.deleteDog(dogProfile);
    if (success) {
      dispatch({
        type: ActionType.DELETEDOG,
        payload: {
          index,
        },
      });
    } else {
      return new Error('Update failed');
    }
  };

  // const updateUser = async (user) => {
  //   await profileApi.updateUser();
  //   dispatch({
  //     type: ActionType.UPDATEUSER,
  //   });
  // };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        deleteDog,
        updateDog,
        // updateUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileContext.propTypes = {
  children: PropTypes.node.isRequired,
};
