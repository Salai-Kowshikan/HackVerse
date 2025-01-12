import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API

const db = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default db ;