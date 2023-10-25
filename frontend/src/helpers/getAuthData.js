const user = JSON.parse(localStorage.getItem('user'));

export const getUsername = () => user.username;
export const getAuthToken = () => user.token;
