/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';

const root = '/proxyPrefix/api';

const store = {};

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
store.axios = axios;

store.login = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/login`, conditions);
};

store.logout = (conditions, args) => {
  return axios.post(`/proxyPrefix/admin/logout`, conditions);
};

store.getImageHeight = url => {
  return axios.get(`${url}?imageInfo`).then(response => response.data);
};

store.getImageToken = body => {
  return axios.post(`/proxyPrefix/admin/token`, body).then(response => response.data);
};

store.fetchList = (model, query) => {
  let target = `${root}/${model}`;
  return axios.get(target, {params: query}).then(response => response.data);
};

store.fetchByID = (model, id, query) => {
  let target = `${root}/${model}/${id}`;
  return axios.get(target, {params: query}).then(response => response.data);
};

store.patchByID = (model, id, form) => {
  let target = `${root}/${model}/${id}`;
  return axios.patch(target, form).then(response => response.data);
};

store.post = (model, form) => {
  let target = `${root}/${model}`;
  return axios.post(target, form).then(response => response.data);
};

store.deleteByID = (model, id) => {
  let target = `${root}/${model}/${id}`;
  return axios.delete(target).then(response => response.data);
};

