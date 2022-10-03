import { apiService } from '../services/api.service';

class ProfileApi {
  // Return user profile information and dogs owned
  async getUserProfile(query) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.get(`/profile`);
        console.log('Retrieved user profile');
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Update user Profile
  async updateUserProfile(updatedUser) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.put(`/profile/updateUser`, updatedUser);
        console.log('Saved user profile');
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Send the updated DOG data to the server for saving]
  async updateDogProfile(updatedDog) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.put(`/profile/updateDog`, updatedDog);
        console.log('Saved dog profile');
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Deletes dog profile
  async deleteDog(dogId) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.delete(`/profile/deleteDog`, dogId);
        console.log('Deleted dog profile');
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Create and save new dog profile
  async saveNewDog(newDog) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.post(`/profile/createDog`, newDog);
        console.log('Created dog profile');
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const profileApi = new ProfileApi();
