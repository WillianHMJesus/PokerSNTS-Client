export const isAuthenticated = () => {
  let user = getUser();
  if (user) {
    if (Date.parse(user?.token?.expires) >= Date.now()) return true;
    signOut();
  }
  return false;
}

export const getUser = () => {
  let user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
}

export const signOut = () => {
  localStorage.removeItem('user');
}