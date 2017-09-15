/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`;
const blogAPI = `/proxyPrefix/api/post`;
const tagAPI = `/proxyPrefix/api/tag`;
const postTagAPI = `/proxyPrefix/api/postTag`;
const postCateAPI = `/proxyPrefix/api/postCategory`;

const root = '/proxyPrefix/api';

const perPage = 10;

const store = {};

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (config.method === 'get' && config.url.indexOf('/proxyPrefix/api/user') === -1) return config;
  if (token !== null && token !== 'undefined') {
    config.headers['authorization'] = token;
  }
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
  if (response.data && response.data.status && response.data.status === 'fail') {
    console.error(response.data.description);
  }
  return response;
}, error => Promise.reject(error));

export default store;

store.login = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/login`, conditions);
};

store.logout = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/logout`, conditions);
};

store.fetchUpdate = (conditions = {}, args) => {
  return axios.get(`/proxyPrefix/api/update`, conditions);
};

store.deleteUpdate = id => {
  return axios.delete(`/proxyPrefix/api/update/${id}`);
};

// post CRUD

store.fetchBlog = (conditions, args) => {
  return axios.get(blogAPI + `?conditions=${JSON.stringify(conditions)}&sort=1`).then(response => response.data, err => console.log(err));
};

store.fetchBlogByID = id => {
  return axios.get(blogAPI + `/${id}`).then(response => response.data, err => console.log(err));
};

store.newBlog = json => {
  return axios.post(blogAPI, json).then(response => response.data, err => console.log(err));
};

store.patchBlog = (id, json) => {
  return axios.patch(`${blogAPI}/${id}`, json).then(response => response.data, err => console.log(err));
};

store.deleteBlogByID = (id, page = 0) => {
  return axios.delete(`${blogAPI}/${id}`).then(response => response.data, err => console.log(err));
};

// cate CRUD

store.fetchCate = (conditions = {}, arg) => {
  return axios.get(`${root}/category?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

store.newCate = name => {
  if (typeof name === 'undefined' || name === '') return;
  return axios.post(`${root}/category`, {
    name
  }).then(response => response.data, err => console.log(err));
};

store.fetchCateById = id => {
  return axios.get(`${root}/category/${id}`).then(response => response.data, err => console.log(err));
};

store.patchCate = (id, json) => {
  return axios.patch(`${root}/category/${id}`, json).then(response => response.data, err => console.log(err));
};

store.deleteCate = id => {
  return axios.delete(`${root}/category/${id}`).then(response => response.data, err => console.log(err));
};

// tag CRUD

store.fetchTag = (conditions = {}, args) => {
  return axios.get(`${root}/tag?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

store.fetchTagById = id => {
  return axios.get(`${root}/tag/${id}`).then(response => response.data, err => console.log(err));
};

store.newTag = name => {
  if (typeof name === 'undefined' || name === '') return;
  return axios.post(`${root}/tag`, {
    name
  }).then(response => response.data, err => console.log(err));
};

store.patchTag = (id, json) => {
  return axios.patch(`${root}/tag/${id}`, json).then(response => response.data, err => console.log(err));
};

store.deleteTag = id => {
  return axios.delete(`${root}/tag/${id}`).then(response => response.data, err => console.log(err));
};

// version CRUD

store.fetchVersion = (conditions = {}, args) => {
  return axios.get(`${root}/update?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

store.fetchVersionById = id => {
  return axios.get(`${root}/update/${id}`).then(response => response.data, err => console.log(err));
};

store.newVersion = json => {
  return axios.post(`${root}/update`, json).then(response => response.data, err => console.log(err));
};

store.patchVersion = (id, json) => {
  return axios.patch(`${root}/update/${id}`, json).then(response => response.data, err => console.log(err));
};

store.deleteVersion = id => {
  return axios.delete(`${root}/update/${id}`).then(response => response.data, err => console.log(err));
};

// option CRUD

store.fetchOption = (conditions = {}, args) => {
  return axios.get(`${root}/option?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

store.patchOption = (id, json) => {
  return axios.patch(`${root}/option/${id}`, json).then(response => response.data, err => console.log(err));
};

// user CRUD

store.fetchUser = () => {
  return axios.get(`${root}/user`).then(response => response.data, err => console.log(err));
};

store.patchUser = (id, json) => {
  return axios.patch(`${root}/user/${id}`, json).then(response => response.data, err => console.log(err));
};

// many to many

store.deleteTagsByPostID = id => {
  return axios.delete(`${postTagAPI}/${id}`).then(response => response.data, err => console.log(err));
};

store.deleteCateByPostID = id => {
  return axios.delete(`${postCateAPI}/${id}`).then(response => response.data, err => console.log(err));
};

// postTag

store.fetchPostTags = () => {
  return axios.get(postTagAPI).then(response => response.data, err => console.log(err));
};

store.fetchPostTagsByID = (conditions) => {
  return axios.get(postTagAPI + `?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

// postCate

store.fetchPostCate = () => {
  return axios.get(postCateAPI).then(response => response.data, err => console.log(err));
};

store.fetchPostCateByID = (conditions) => {
  return axios.get(postCateAPI + `?conditions=${JSON.stringify(conditions)}`).then(response => response.data, err => console.log(err));
};

store.deletePostTags = id => {
  return axios.delete(`${postTagAPI}/${id}`).then(response => response, err => console.log(err));
};

store.addPostTags = json => {
  return axios.post(`${postTagAPI}`, json).then(response => response.data, err => console.log(err));
};

store.deletePostCates = id => {
  return axios.delete(`${postCateAPI}/${id}`).then(response => response, err => console.log(err));
};

store.addPostCates = (vue, json) => {
  return axios.post(`${postCateAPI}`, json).then(response => response.data, err => console.log(err));
};
