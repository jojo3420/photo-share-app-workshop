const fetch = require('node-fetch');

function requestGithubToken(credentials) {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());
}

function requestGithubUserAccount(token) {
  return fetch(
    `https://api.github.com/user?access_token=${token}`,
  ).then((res) => res.json());
}

async function authorizeWithGithub(credentials) {
  const { access_token } = await requestGithubToken(credentials);
  // console.log({ access_token });
  if (access_token) {
    const githubUser = await requestGithubUserAccount(access_token);
    // console.log({ githubUser });
    return {
      access_token,
      ...githubUser,
    };
  }
  throw new Error('access_token is null');
}

module.exports = {
  authorizeWithGithub,
};
