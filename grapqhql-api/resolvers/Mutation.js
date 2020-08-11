const { authorizeWithGithub } = require('../lib/github');
const Mutation = {
  postPhoto: (parent, props, context) => {
    const { db } = context;
  },
  githubAuth: async (parent, props, context) => {
    const { db } = context;
    const { code } = props;
    const credentials = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };
    const {
      message,
      access_token,
      login,
      name,
      avatar_url,
    } = await authorizeWithGithub(credentials);

    if (message) {
      throw new Error(message);
    }

    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };
    const {
      ops: [user],
    } = await db
      .collection('users')
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

    return { user, token: access_token };
  },
};

module.exports = Mutation;
