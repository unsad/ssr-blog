/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';
import api from 'create-api';

const prefix = `${host}/api`;

const aboutAPI = `${host}/api/post?title=关于`;
const blogAPI = `${host}/api/post`;
const tagAPI = `${host}/api/tag`;
const themeAPI = `${host}/api/theme?conditions={"name": "firekylin"}&select={"_id": 0}`;
const perPage = 10;

const store = {};

const shouldCache = api.onServer;

store.fetch = (model, query) => {
  let target = `${prefix}/${model}`;
  return axios.get(target, {params: query}).then(response => response.data).catch(err => console.error(err));
};

export default store;

