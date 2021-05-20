import client from './index';
import { getUser } from '../components/account/auth';

export const getAll = () => (
  client.get('v1/Player', {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  })
);

export const add = player =>
  client.post('v1/Player', player, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });
