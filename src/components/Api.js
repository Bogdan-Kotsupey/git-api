const BASE_URL = 'https://api.github.com/users/';

export const getUser = userName => (
  fetch(BASE_URL + userName)
    .then(response => response.json())
);
