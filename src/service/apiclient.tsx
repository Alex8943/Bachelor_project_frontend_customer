import axios from 'axios';

interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;


export const getRoles = async () => {
    try{
      const response = await axios.get(`${API_URL}/roles`);
      return response.data;
    }catch(error){
      console.error('Error fetching roles:', error);
      throw error;
    }
};


interface LoginParams {
  email: string;
  password: string;
}

interface SignupParams {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role_fk?: number;
}

export const login = async ({ email, password }: LoginParams) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // Assuming this is the format of the response
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const signup = async ({name, lastname, email, password, role_fk}: SignupParams) => {
  try{
    const response = await axios.post(`${API_URL}/auth/signup`, { name, lastname, email, password, role_fk});
    return response.data;
  }catch(error){
    console.error('Error fetching reviews:', error);
    throw error;
  }
};


export const getAllReviewsByUser = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}



