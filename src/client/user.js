import client from './index';

export const signIn = (userName, password) => (
  client.post('v1/Account/Token', {
    userName,
    password
  })
)