import axios from 'axios';

const db = axios.create({
  baseURL: 'http://192.168.227.103:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default db ;