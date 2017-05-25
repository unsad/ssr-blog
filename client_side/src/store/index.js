/**
 * Created by unsad on 2017/5/23.
 */
import { EventEmitter } from 'events';
const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`;
const blogAPI = `/proxyPrefix/api/post`;

const store = new EventEmitter();

export default store;

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    console.log('response ok');
    return response.body;
  }, (err) => {
    console.log('response error', err);
  })
};

store.fetchBlogByPage = (vue, page = 0, perPage = 10) => {
  return vue.$http.get(blogAPI, {
    params: {
      conditions: {
        type: 0
      },
      limit: perPage,
      skip: page * perPage
    }
  }).then((response) => {
    console.log(response.body[0].title);
    return response.body;
  }, (err) => {
    console.log('response error', err);
  })
};

store.fetchBlogCount = (vue, page = 0, perPage = 10) => {
  return vue.$http.get(blogAPI, {
    params: {
      conditions: {
        type: 0
      },
      count: 1
    }
  }).then((response) => {
    return Math.ceil(parseInt(response.body) / perPage);
  }, (err) => {
    console.log('response error', err);
  })
};
