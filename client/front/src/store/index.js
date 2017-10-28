/**
 * Created by unsad on 2017/5/23.
 */
import axios from 'axios';

const host = typeof location === 'undefined' ?
              process.env.NODE_ENV === 'production' ?
                'http://localhost:3000' :
                  'http://localhost:8080/proxyPrefix' : '/proxyPrefix';

const prefix = `${host}/api`;

const aboutAPI = `${host}/api/post?title=关于`;
const blogAPI = `${host}/api/post`;
const tagAPI = `${host}/api/tag`;
const themeAPI = `${host}/api/theme?conditions={"name": "firekylin"}&select={"_id": 0}`;
const perPage = 10;

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

// post CRUD

store.fetchPost = (conditions, args) => {
  let target = `${blogAPI}?conditions=${JSON.stringify(conditions)}`;
  if (args.select) {
    target += `&select=${JSON.stringify(args.select)}`;
    delete args.select;
  }
  return axios.get(target).then(response => response.data, err => console.log(err));
};

store.fetchPostByID = (id, conditions, args) => {
  let target = `${blogAPI}/${id}?conditions=${JSON.stringify(conditions)}`;
  if (args.select) {
    target += `&select=${JSON.stringify(args.select)}`;
    delete args.select;
  }
  args = convertObjectToArray(args);
  return args.reduce((prev, curr) => {
    prev = prev.query(curr);
    return prev;
  }, axios.get(target)).then(response => response.data, err => console.log(err));
};

// cate CRUD

// tag CRUD

store.fetchTags = () => {
  return axios.get(tagAPI).then(response => response.data, err => console.log(err));
};

store.fetchTheme = () => {
  return axios.get(themeAPI).then(response => response.data, err => console.log(err));
};

// option CRUD

store.fetchOption = () => {
  return axios.get(`${prefix}/option?select={"_id": 0, "key": 1, "value": 1}`).then(response => response.data, err => console.log(err));
};

