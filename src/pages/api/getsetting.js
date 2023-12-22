import axios from 'axios';

const baseURL = 'http://192.168.29.112:7070/'; // Set your API base URL here 

const instance = axios.create({
  baseURL: baseURL
});


export const getSetting = async (deviceId ) => {
  try {
    const response = await instance.post('/getConfig', {
      deviceId: deviceId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};