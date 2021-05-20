import client from './index';
import { getUser } from '../components/account/auth';

export const getByRankingId = rankingId => (
  client.get(`v1/Round/filter?rankingId=${rankingId}`, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  })
);

export const add = round =>
  client.post('v1/Round', round, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });
