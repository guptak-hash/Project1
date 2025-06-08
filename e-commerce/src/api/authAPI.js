import axios from 'axios';

const API_URL = 'http://localhost:3001/users'; // JSON Server

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return { user: response.data, token: 'dummy_token' };
};

export const loginUser = async (credentials) => {
  const response = await axios.get(`${API_URL}?email=${credentials.email}`);
  if (!response.data[0] || response.data[0].password !== credentials.password) {
    throw new Error('Invalid credentials');
  }
  return { user: response.data[0], token: 'dummy_token' };
};