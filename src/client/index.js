import axios from 'axios';

const client = axios.create({
  baseURL: "https://pokersnts-prd.us-east-2.elasticbeanstalk.com"
});

export default client;
