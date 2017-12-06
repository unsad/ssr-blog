/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';
import api from 'create-api';

const prefix = `${api.host}/api`;

const store = {};
store.fetch = (model, query) => {
  const target = `${prefix}/${model}`;
  return axios.get(target, {params: query}).then(response => response.data);
};

export default store;

