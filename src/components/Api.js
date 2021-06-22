const BASE_URL = 'https://api.github.com/';

export const getRepo = userName => (
  fetch(`${BASE_URL}users/${userName}`)
    .then(response => response.json())
);

export const getReadme = (repo) => (
  fetch(`${BASE_URL}repos/${repo.owner.login}/${repo.name}/readme`)
    .then(response => response.json())
);
