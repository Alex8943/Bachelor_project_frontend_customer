import axios from 'axios';

interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;


export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    const { authToken } = response.data;

    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      throw new Error('Login failed: No authToken returned');
    }

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const signup = async ({ name, lastname, email, password }) => {
  try {
    console.log("signup data: ", { name, lastname, email, password });
    const response = await axios.post(`${API_URL}/auth/signup`, { name, lastname, email, password, role_fk: 3 });

    const { authToken } = response.data;

    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      throw new Error('Signup failed: No authToken returned');
    }

    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

const getAuthToken = (): string => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No auth token found');
  }
  return authToken;
};


export const createReview = async (data) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post(`${API_URL}/review`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log("api response: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}

export const updateUser = async (id, data) => {
  try {
    const authToken = getAuthToken();
    await axios.put(`${API_URL}/update/user/${id}`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/roles`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const authToken = getAuthToken();
    await axios.put(`${API_URL}/delete/user/${id}`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getAllReviewsByUser = async (id: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/user/${id}/reviews`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getRangeOfReviews = async (max, offset) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/reviews/${max}/${offset}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};


export const getOneUser = async (id: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const deleteReview = async (id: number) => {
  try {
    const authToken = getAuthToken();
    await axios.put(`${API_URL}/delete/review/${id}`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export const showAllDeletedReviews = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/softDeletedReviews`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const updateReview = async (id: number, data) => {
  try {
    const authToken = getAuthToken();
    await axios.put(`${API_URL}/update/review/${id}`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const undeleteReview = async (id: number) => {
  try {
    const authToken = getAuthToken();
    await axios.put(`${API_URL}/undelete/review/${id}`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.error('Error undeleting review:', error);
    throw error;
  }
};

export const getOneReview = async (id: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/getReview/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
};

export const likeAReview = async (userId: number, reviewId: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post(`${API_URL}/like`, { userId, reviewId }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error liking review:', error);
    throw error;
  }
};

export const getLikedReviewsFromUser = async (userId: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/liked/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching liked reviews:', error);
    throw error;
  }
};

export const dislikeAReview = async (userId: number, reviewId: number) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.put(`${API_URL}/dislike`, { userId, reviewId }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error disliking review:', error);
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/genres`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

export const getAllMedias = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/medias`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching medias:', error);
    throw error;
  }
}

export const getAllPlatforms = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/platforms`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
}

export const getTopGenres = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`${API_URL}/genres/top`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top genres:", error);
    throw error;
  }
};




