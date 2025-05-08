import axios from 'axios';
import {ApiResponse, Driver, Race} from '../types/api';

const BASE_URL = 'https://ergast.com/api/f1';

export const api = {
  getDrivers: async (
    offset: number = 0,
    limit: number = 30,
  ): Promise<ApiResponse<Driver>> => {
    try {
      const response = await axios.get(`${BASE_URL}/drivers.json`, {
        params: {
          offset,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch drivers');
    }
  },

  getDriverRaces: async (
    driverId: string,
    offset: number = 0,
    limit: number = 30,
  ): Promise<ApiResponse<Race>> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/drivers/${driverId}/results.json`,
        {
          params: {
            offset,
            limit,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch driver races');
    }
  },
};
