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
  ADDDOG: 'ADDDOG',
  SAVENEWDOG: 'SAVENEWDOG',
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
    const { index } = action.payload;
    let updatedDogs = state.dogs;
    updatedDogs.splice(index, 1);
    console.log(index, 'removed', { updatedDogs });
    return {
      ...state,
      dogs: updatedDogs,
    };
  },

  UPDATEUSER: (state, action) => {
    const { updatedUserProfile } = action.payload;
    return {
      ...state,
      user: updatedUserProfile,
    };
  },
  ADDDOG: (state, action) => {
    const { emptyDog } = action.payload;
    const updatedDogs = state.dogs;
    updatedDogs.push(emptyDog);
    return {
      ...state,
      dogs: updatedDogs,
    };
  },
  SAVENEWDOG: (state, action) => {
    const { savedDog, index } = action.payload;
    const updatedDogs = state.dogs;
    updatedDogs[index] = savedDog;
    console.log({ updatedDogs });
    return {
      ...state,
      dogs: updatedDogs,
    };
  },
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
  addDog: () => Promise.resolve(),
  saveNewDog: () => Promise.resolve(),
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
    try {
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
        return success;
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteDog = async (dogProfile, index) => {
    try {
      let success = true;
      // If this was a previous saved entry with assigned dogId run the API to delete from DB
      // if (dogProfile.id) {
      //   const response = await profileApi.deleteDog(dogProfile.id);
      //   success = response.success;
      // }
      // On successful API call or if the profile is an unsaved profile
      // Update the context to remove the card
      if (success || !dogProfile.id) {
        dispatch({
          type: ActionType.DELETEDOG,
          payload: {
            index,
          },
        });
        return success;
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateUser = async (updatedUserProfile) => {
    try {
      const { success, data } = await profileApi.updateUserProfile(
        updatedUserProfile
      );
      console.log({ updatedUserProfile });
      if (success) {
        dispatch({
          type: ActionType.UPDATEUSER,
          payload: {
            updatedUserProfile,
          },
        });
      } else {
        throw new Error('Update user failed.');
      }
      return success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const addDog = (emptyDog) => {
    dispatch({
      type: ActionType.ADDDOG,
      payload: {
        emptyDog,
      },
    });
  };

  const saveNewDog = async (dogProfile, index) => {
    try {
      const { success, data } = await profileApi.saveNewDog(dogProfile);
      if (success) {
        dispatch({
          type: ActionType.SAVENEWDOG,
          payload: {
            index,
            savedDog: data,
          },
        });
        return success;
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <ProfileContext.Provider
      value={{
        ...state,
        deleteDog,
        updateDog,
        updateUser,
        addDog,
        saveNewDog,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileContext.propTypes = {
  children: PropTypes.node.isRequired,
};
