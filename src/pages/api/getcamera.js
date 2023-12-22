import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const baseURL = 'http://localhost:7073/api'; // Set your API base URL here 

const instance = axios.create({
  baseURL: baseURL
});

export async function getCustomerCameraList() {
  try {
    const response = await instance.get('/allcamera', {

    });
    return response;

  } catch (error) {
    throw error;
  }
}

export async function createCamera(data) {
  try {
    const response = await instance.post('/importcamera', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateCamera(cameraId, charger, sdcard, simcard, boxNo) {
  try {
    const response = await instance.put(`/camera/${cameraId}`, {
      charger: charger,
      sdcard: sdcard,
      simcard: simcard,
      boxNo: boxNo,
    });
    console.log("hello", response);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteCamera(cameraId) {
  console.log("rekha",cameraId);
  try {
    const response = await instance.delete(`/camera/${cameraId}`);
    return response;
  } catch (error) {
    throw error;
  }
}


// Box Api

export async function getBox() {
  try {
    const response = await instance.get('/allbox', {

    });
    return response;

  } catch (error) {
    throw error;
  }
}

export async function createBox(data) {
  try {
    const response = await instance.post('/createbox', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteBox(cameraId) {
  console.log("rekha",cameraId);
  try {
    const response = await instance.delete(`/box/${cameraId}`);
    return response;
  } catch (error) {
    throw error;
  }
}



// Shelf Api

export async function getShelf() {
  try {
    const response = await instance.get('/allshelf', {
      
    });
    return response;

  } catch (error) {
    throw error;
  }
}

export async function createShelf(data) {
  try {
    const response = await instance.post('/createshelf', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteShelf(cameraId) {
  console.log("rekha",cameraId);
  try {
    const response = await instance.delete(`/shelf/${cameraId}`);
    return response;
  } catch (error) {
    throw error;
  }
}


// Shelf Api

export async function getRack() {
  try {
    const response = await instance.get('/allrack', {
      
    });
    return response;

  } catch (error) {
    throw error;
  }
}

export async function createRack(data) {
  try {
    const response = await instance.post('/createrack', data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteRack(cameraId) {
  console.log("rekha",cameraId);
  try {
    const response = await instance.delete(`/rack/${cameraId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
