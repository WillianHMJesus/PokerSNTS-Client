import axios from 'axios';

const client = axios.create({
  //baseURL: "http://pokersnts.us-east-1.elasticbeanstalk.com"
  baseURL: "https://localhost:44361/"
});

export default client;
