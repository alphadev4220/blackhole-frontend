const api = {
  rootUrl: '/',
  baseUrl: 'https://www.blackholeonjuno.com/api', //mock data base folder
  imgUrl: "https://www.blackholeonjuno.com/uploads/",
  user: '/users',
  collection: '/collections',
  utils: '/utils'
}

export default api;

export const getAvatar = (data) => {
  return (data && data.avatar) ? (api.imgUrl + data.avatar) : "/img/avatar.png";
}
