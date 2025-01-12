import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API

const db = axios.create({
<<<<<<< Updated upstream
  baseURL: apiUrl,
=======
  baseURL: 'https://hackverse-79o4.onrender.com',
>>>>>>> Stashed changes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default db ;