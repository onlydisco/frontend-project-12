export default () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { token: user?.token, username: user?.username };
};
