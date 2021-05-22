import axios from 'axios';

const client = axios.create({
  baseURL: "https://api.poker-snts.club"
});

export default client;
