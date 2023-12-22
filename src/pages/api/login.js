import axios from 'axios';

const baseURL = 'https://octopus-app-gl75w.ondigitalocean.app'; // Set your API base URL here 

const instance = axios.create({
  baseURL: baseURL
});



export const login = async (email, password) => {
  try {
    const response = await instance.post('/login', {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    // Handle errors, and include an error message in the response
    return { success: false, message: error.response.data.message };
  }
};

export const signup = async (email, password) => {
  try {
    const response = await instance.post('/register', {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    // Handle errors, and include an error message in the response
    return { success: false, message: error.response.data.message };
  }
}

export const verify = async (emails, otpValue) => {
  console.log(otpValue,emails)
  try {
    const response = await instance.put('/activate', {
      email: emails,
      activationcode: otpValue,
    });

    return response.data;
  } catch (error) {
    // Handle errors, and include an error message in the response
    return { success: false, message: error.response.data.message };
  }
}

export const reverify = async (emails) => {
  try {
    const response = await instance.post('/reverify', {
      email: emails,
    });

    return response.data;
  } catch (error) {
    // Handle errors, and include an error message in the response
    return { success: false, message: error.response.data.message };
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await instance.post('/password/forgot', {
      email: email,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const resetPassword = async (password, confirmPassword, token) => {
  try {
    const response = await instance.put(`/password/reset/${token}`, {
      password: password,
      confirmPassword: confirmPassword,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updatePassword = async (password, token) => {
  try {
    const response = await instance.post('/password/update', {
      password: password,
      token: token,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}


async function extractLoginResult(xmlResponse) {
  const result = await parseStringPromise(xmlResponse, {
    explicitArray: false,
    ignoreAttrs: true,
  });
  const envelope = result['soap:Envelope'];
  const body = envelope['soap:Body'];
  const loginResponse = body.LoginResponse;
  const loginResult = loginResponse.LoginResult;
  // console.log(loginResult)
  return loginResult;
}
