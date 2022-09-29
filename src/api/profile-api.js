import { apiService } from '../services/api.service';

class ProfileApi {
  async getUserProfile(query) {
    return new Promise((resolve, reject) => {
      try {
        console.log('Retrieving user profile');
        const response = apiService.get(`/profile`);
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const profileApi = new ProfileApi();
