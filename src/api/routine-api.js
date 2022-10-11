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
        console.error('[Routine Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Create and save new routine
  async saveNewRoutine(newRoutine) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.post(`/routines/create`, newRoutine);
        console.log('Created new routine');
        resolve(response);
      } catch (err) {
        console.error('[Routine Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Send the updated routine data to the server for saving
  async updateRoutine(updatedRoutine) {
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.put(`/routines/update`, updatedRoutine);
        console.log('Updated routine');
        resolve(response);
      } catch (err) {
        console.error('[Routine Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  // Deletes dog profile
  async deleteRoutine(routineId) {
    console.log(routineId);

    return new Promise((resolve, reject) => {
      try {
        const response = apiService.put(`/routines/delete`, { routineId });
        console.log('Routine deleted');
        resolve(response);
      } catch (err) {
        console.error('[Routine Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const routineApi = new RoutineApi();
