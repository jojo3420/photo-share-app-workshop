const { authorizeWithGithub, generateFakeUsers } = require('../lib/github');
const Mutation = {
  postPhoto: (parent, props, context) => {
    const { db } = context;
  },
  // join and login, (join or login)
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
  // Fake user DB 저장
  addFakeUsers: async (parent, { count }, { db }) => {
    // const url = `https://randomuser.me/api/results=${count}`;

    const { results } = await generateFakeUsers(count);

    // 유저 생성
    const users = results.map((user) => ({
      githubLogin: user.login.username,
      name: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.thumbnail,
      githubToken: user.login.sha1,
    }));

    // Save DB - users
    await db.collection('users').insert(users);
    return users;
  },

  // Fake user 인증
  fakeUserAuth: async (parent, { githubLogin }, { db }) => {
    const user = await db.collection('users').findOne({ githubLogin });
    if (!user) {
      throw new Error('Cannot find user with githubLogin ' + githubLogin);
    }

    return {
      token: user.githubToken,
      user,
    };
  },
};

module.exports = Mutation;
