import client from './index';
import { getUser } from '../components/account/auth';

export const getAll = () =>
  client.get('v1/ranking');

export const getOverrallById = rankingId =>
  client.get(`v1/ranking/${rankingId}/overrall`);

export const add = ranking =>
  client.post('v1/Ranking', ranking, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });

export const update = ranking =>
  client.put( `v1/Ranking/${ranking.id}`, ranking, {
    headers: {
      'Authorization': `${getUser().token.accessToken}`
    }
  });
