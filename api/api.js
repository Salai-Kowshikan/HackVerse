import axios from 'axios';

const db = axios.create({
  baseURL: 'http://10.53.10.3:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default db ;