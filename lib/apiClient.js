import axios from 'axios';

const API_VERSION = 'v1'; // process.env.NEXT_APP_API_VERSION

const apiClient = axios.create({
  baseURL: `/api/${API_VERSION}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;