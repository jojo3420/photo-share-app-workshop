const users = [
  { githubLogin: 'jojo', name: 'park jihoon' },
  { githubLogin: 'nari', name: 'lee nari' },
  { githubLogin: 'kim', name: 'kim sanghoo' },
];
const photos = [
  {
    id: '1',
    title: 'dog',
    description: '1',
    category: 'PORTRAIT',
    githubUser: 'jojo',
    created: '2020-10-10'
  },
  {
    id: '2',
    title: 'baby',
    description: '2',
    category: 'PORTRAIT',
    githubUser: 'jojo',
    created: '2020-10-20'
  },
  {
    id: '3',
    title: 'children',
    description: 'this is children pic',
    category: 'SELFIE',
    githubUser: 'nari',
    created: '2020-11-10'
  },
  {
    id: '4',
    title: 'game',
    description: 'kim game pic',
    category: 'GRAPHIC',
    githubUser: 'kim',
    created: '2020-12-01'
  },
];

const tags = [
  {photoID: '1', userID: 'jojo'},
  {photoID: '2', userID: 'jojo'},
  {photoID: '2', userID: 'nari'},
  {photoID: '2', userID: 'kim'},
];

module.exports = {
  photos,
  tags,
  users
}
