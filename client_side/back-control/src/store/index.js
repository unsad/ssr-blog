/**
 * Created by unsad on 2017/5/23.
 */
import { EventEmitter } from 'events';
const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`;
const blogAPI = `/proxyPrefix/api/post`;
const tagAPI = `/proxyPrefix/api/tag`;
const postTagAPI = `/proxyPrefix/api/postTag`;
const postCateAPI = `/proxyPrefix/api/postCategory`;

const root = 'proxyPrefix/api';

const perPage = 10;

const store = new EventEmitter();

export default store;

store.newTag = (vue, name) => {
  if (typeof name === 'undefined' || name === '') return;
  return vue.$http.post(`${root}/tag`, {
    name
  }).then((response) => response.body, err => console.log(err));
};

store.newCate = (vue, name) => {
  if (typeof name === 'undefined' || name === '') return;
  return vue.$http.post(`${root}/category`, {
    name
  }).then((response) => response.body, err => console.log(err));
};

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    console.log('response ok');
    return response.body;
  }, (err) => {
    console.log('response error', err);
  });
};

store.fetchUser = vue => {
  return vue.$http.get(`${root}/user`).then(response => response.body, err => console.log(err));
};

store.patchUser = (vue, id, json) => {
  return vue.$http.patch(`${root}/user/${id}`, json).then(response => response.body, err => console.log(err));
};

store.fetchTag = vue => {
  return vue.$http.get(`${root}/tag`).then(response => response.body, err => console.log(err));
};

store.fetchTagById = (vue, id) => {
  return vue.$http.get(`${root}/tag/${id}`).then(response => response.body, err => console.log(err));
};

store.patchTag = (vue, id, json) => {
  return vue.$http.patch(`${root}/tag/${id}`, json).then(response => response.body, err => console.log(err));
};

store.deleteTag = (vue, id) => {
  return vue.$http.delete(`${root}/tag/${id}`).then(response => response.body, err => console.log(err));
};

store.fetchCate = vue => {
  return vue.$http.get(`${root}/category`).then(response => response.body, err => console.log(err));
};

store.fetchCateById = (vue, id) => {
  return vue.$http.get(`${root}/category/${id}`).then(response => response.body, err => console.log(err));
};

store.patchCate = (vue, id, json) => {
  return vue.$http.patch(`${root}/category/${id}`, json).then(response => response.body, err => console.log(err));
};

store.deleteCate = (vue, id) => {
  return vue.$http.delete(`${root}/category/${id}`).then(response => response.body, err => console.log(err));
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

store.deleteBlogByID = (vue, id, page = 0) => {
  return vue.$resource(`blogAPI/${id}`).delete({
    id
  }).then(response => response.body, err => console.log(err));
};

store.deleteTagsByPostID = (vue, id) => {
  return vue.$http.delete(`${postTagAPI}/${id}`).then(response => response.body, err => console.log(err));
};

store.deleteCateByPostID = (vue, id) => {
  return vue.$http.delete(`${postCateAPI}/${id}`).then(response => response.body, err => console.log(err));
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

store.fetchPostCate = vue => {
  return vue.$http.get(postCateAPI).then(response => response.body, err => console.log(err));
};

store.fetchPostCateByID = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$resource(postCateAPI + '{?keys, values}').get({
    keys,
    values
  }).then(response => response.body, err => console.log(err));
};

store.deletePostTags = (vue, id) => {
  return vue.$http.delete(`${postTagAPI}/${id}`).then(response => response, err => console.log(err));
};

store.addPostTags = (vue, json) => {
  return vue.$http.post(`${postTagAPI}`, json).then(response => response.body, err => console.log(err));
};

store.deletePostCates = (vue, id) => {
  return vue.$http.delete(`${postCateAPI}/${id}`).then(response => response, err => console.log(err));
};

store.addPostCates  = (vue, json) => {
  return vue.$http.post(`${postCateAPI}`, json).then(response => response.body, err => console.log(err));
};

store.fetchOption = (vue) => {
  return vue.$http.get(`${root}/option`).then(response => response.body, err => console.log(err));
};

store.patchOption = (vue, id, json) => {
  return vue.$http.patch(`${root}/option/${id}`, json).then(response => response.body, err => console.log(err));
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

store.fetchPostTagsByID = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.values(queryJSON);
  return vue.$resource(postTagAPI + '{?keys, values}').get({
    keys,
    values
  }).then(response => response.body, err => console.log(err));
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

store.newBlog = (vue, json) => {
  return vue.$http.post(blogAPI, json).then(response => response.body, err => console.log(err));
};

store.patchBlog = (vue, id, json) => {
  return vue.$http.patch(`${blogAPI}/${id}`, json).then(response => response.body, err => console.log(err));
};
