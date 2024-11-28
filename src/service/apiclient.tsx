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

export const signup = async ({name, lastname, email, password}: SignupParams) => {
  try{
    const response = await axios.post(`${API_URL}/auth/signup`, { name, lastname, email, password});
    return response.data;
  }catch(error){
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const updateUser = async (id: number, {name, lastname, email, password, role_fk}: SignupParams) => {
  try{
    const response = await axios.put(`${API_URL}/auth/updateUser/${id}`, {name, lastname, email, password, role_fk});
    return response.data;
  }catch(error){
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

export const deleteUser = async (id: number) => {
  try {
    await axios.put(`${API_URL}/delete/user/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
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

export const searchReviews = async (value: string) => {
  try {
    console.log("Searching for reviews with title:", value);
    const response = await axios.get(`${API_URL}/review/${value}`);
    console.log("Search results: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};


export const getRangeOfReviews = async (max: any) => {
  try{
    const response = await axios.get(`${API_URL}/reviews/${max}`);
    return response.data;
  }catch(error){
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

export const getOneUser = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/user/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Ensure this returns the user object directly
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


export const deleteReview = async (id: number) => {
  try {
    
    await axios.put(`${API_URL}/delete/review/${id}`);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export const showAllDeletedReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/softDeletedReviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

export const undeleteReview = async (id: number) => {
  try {
    await axios.put(`${API_URL}/undelete/review/${id}`);
  } catch (error) {
    console.error('Error undeleting review:', error);
    throw error;
  }
}


export const getOneReview = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/getReview/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
}

export const likeAReview = async (userId: number, reviewId: number) => {
  try {
    // Send userId and reviewId in the request body
    const response = await axios.post(`${API_URL}/like`, {userId, reviewId});
    return response.data;
  } catch (error) {
    console.error('Error liking review:', error);
    throw error;
  }
};

export const getLikedReviewsFromUser = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/liked/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching liked reviews:', error);
    throw error;
  }
};

export const dislikeAReview = async (userId: number, reviewId: number) => {
  try {
    // Send userId and reviewId in the request body
    const response = await axios.put(`${API_URL}/dislike`, {userId, reviewId});
    return response.data;
  } catch (error) {
    console.error('Error disliking review:', error);
    throw error;
  }
};


