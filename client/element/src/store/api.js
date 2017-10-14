/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';

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
    console.log(response.data.description);
  }
  return response;
}, error => Promise.reject(error));

export default store;

function isObject(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

function convertObjectToArray(args) {
  return isObject(args) ? Object.keys(args).map((value, index) => {
    let temp = {};
    temp[value] = args[value];
    return temp;
  }) : [];
}

store.login = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/login`, conditions);
};

store.logout = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/logout`, conditions);
};

store.fetchList = (model, query) => {
  let target = `${root}/${model}`;
  return axios.get(target, {params: query}).then(response => response.data, err => console.log(err));
};

store.fetchByID = (model, id, query) => {
  let target = `${root}/${model}/${id}`;
  return axios.get(target, {params: query}).then(response => response.data, err => console.log(err));
};

store.patchByID = (model, id, form) => {
  let target = `${root}/${model}/${id}`;
  return axios.patch(target, form).then(response => response.data, err => console.log(err));
};

store.post = (model, form) => {
  let target = `${root}/${model}`;
  return axios.post(target, form).then(response => response.data, err => console.log(err));
};

store.deleteByID = (model ,id) => {
  let target = `${root}/${model}/${id}`;
  return axios.delete(target).then(response => response.data, err => console.log(err));
};

