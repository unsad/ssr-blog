/**
 * Created by unsad on 2017/5/23.
 */
import { EventEmitter } from 'events';
const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`;
const blogAPI = `/proxyPrefix/api/post`;
const tagAPI = `/proxyPrefix/api/tag`;
const postTagAPI = `/proxyPrefix/api/postTag`;

const store = new EventEmitter();

export default store;

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    console.log('response ok');
    return response.body;
  }, (err) => {
    console.log('response error', err);
  });
};

store.fetchBlogByPage = (vue, queryJSON, perPage = 10) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$http.get(blogAPI, {
    params: {
      keys,
      values,
      limit: perPage,
      skip: page * perPage,
      sort: '1'
    }
  }).then((response) => {
    console.log(response.body[0].title);
    return response.body;
  }, (err) => {
    console.log('response error', err);
  });
};

store.fetchBlogCount = (vue, queryJSON, page = 0) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$http.get(blogAPI, {
    params: {
      keys,
      values,
      count: 1
    }
  }).then((response) => {
    return Math.ceil(parseInt(response.body) / perPage);
  }, (err) => {
    console.log('response error', err);
  });
};

store.fetchAllBlog = (vue) => {
  return vue.$http.get(blogAPI, {
    params: {
      keys: ['type'],
      values: ['0'],
      sort: '1'
    }
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};

store.fetchTags = (vue) => {
  return vue.$http.get(tagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};

store.fetchPostTags = (vue) => {
  return vue.$http.get(postTagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};

store.fetchPostByPathName = (vue, pathName) => {
  return vue.$http.get(blogAPI, {
    params: {
      keys: ['pathName'],
      values: [pathName]
    }
  }).then((response) => {
    return response.body[0];
  }, (err) => {
    console.log(err);
  });
};

store.fetchPrevPostByPathName = (vue, id) => {
  let api = `${blogAPI}/${id}?prev=1`;
  return vue.$http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};

store.fetchNextPostByPathName = (vue, id) => {
  let api = `${blogAPI}/${id}?next=1`;
  return vue.$http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};
