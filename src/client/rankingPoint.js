import client from './index';
import { getUser } from '../components/account/auth';

export const getByPosition = position => 
  client.get(`v1/Ranking/Point/filter?position=${position}`, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });