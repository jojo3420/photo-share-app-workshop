const Query = {
  totalUsers: (_, props, { db }) => {
    return db.collection('users').estimatedDocumentCount();
  },
  totalPhotos: (parent, props, { db }) => {
    return db.collection('users').estimatedDocumentCount();
  },
  allUsers: (_, props, { db }) => {
    return db.collection('users').find().toArray();
  },

  allPhotos: (_, props, { db }) => {
    return db.collection('photos').find().toArray();
  },
  me: (_, props, { user }) => user,
};

module.exports = Query;
