import { apiService } from '../services/api.service';

class RoutineApi {
  // Return user profile information and dogs owned
  async getRoutines(query) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.get(`/routines`);
        console.log("Retrieved user's routines");
        resolve(response);
      } catch (err) {
        console.error('[Profile Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const routineApi = new RoutineApi();
