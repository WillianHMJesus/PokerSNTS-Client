import client from './index';
import { getUser } from '../components/account/auth';

export const add = roundPoint =>
  client.post('v1/Round/Point', roundPoint, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });