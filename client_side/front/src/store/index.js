/**
 * Created by unsad on 2017/5/23.
 */
import { EventEmitter } from 'events';
const aboutAPI = `/proxyPrefix/api/post/?title=关于`;
const blogAPI = `/proxyPrefix/api/post`;
const tagAPI = `/proxyPrefix/api/tag`;
const postTagAPI = `/proxyPrefix/api/postTag`;
const categoryAPI = `/proxyPrefix/api/category`;
const postCateAPI = `/proxyPrefix/api/postCategory`;
const perPage = 10;

const store = new EventEmitter();

export default store;

store.fetchPage = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$resource(blogAPI + '{?keys,values}').get({
    keys,
    values
  }).then((response) => {
    console.log('response ok');
    return response.body;
  }, (err) => {
    console.log('response error', err);
  });
};

store.fetchBlogByID = (vue, id, page = 0) => {
  return vue.$http.get(blogAPI, {
    params: {
      id
    }
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err);
  });
};

store.fetchBlogByPage = (vue, queryJSON, page = 0) => {
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

store.fetchTagsByPostID = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$http.get(postTagAPI, {
    keys,
    values
  }).then((response) => {
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

store.fetchCatesByPostID = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value => queryJSON[value]);
  return vue.$resource(postCateAPI + '{?keys, values}').get({
    keys,
    values
  }).then(response => response.body, err => console.log(err));
};

store.fetchCates = vue => {
  return vue.$http.get(categoryAPI).then(response => response.body, err => console.log(err));
};
