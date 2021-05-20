import axios from 'axios';

const client = axios.create({
  baseURL: "https://pokersnts-prd.us-east-2.elasticbeanstalk.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Header set Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Header add Access-Control-Allow-Headers": "Authorization, Content-Type, Accept",
    "Header set Access-Control-Allow-Credentials": true
  }
});

export default client;
