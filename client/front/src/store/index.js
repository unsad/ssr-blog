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
  const target = `${prefix}/${model}`;
  const key = target + JSON.stringify(query);
  if (shouldCache && api.cache.has(key)) {
    return Promise.resolve(api.cache.get(key));
  }
  return axios.get(target, {params: query}).then(response => {
    const result = response.data;
    if (shouldCache) {
      api.cache.set(key, result);
    }
    return result;
  });
};

export default store;

