/**
 * Created by unsad on 2017/5/9.
 */
const config = require('../conf/config');
const mongoose = require('mongoose');
const log = require('../utils/log');

let mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';
mongoose.connect(mongoUrl);

let db = mongoose.connection; // 监控数据库变化
db.on('error', log.error.bind(log, 'connect error:'));
db.once('open', () => console.log('MongoDB opened!'));

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let post = new Schema({
  type: {type: String, default: ''},
  status: {type: Number, default: 0},
  title: String,
  pathName: {type: String, default: ''},
  summary: {type: String},
  markdownContent: {type: String},
  content: {type: String},
  allowComment: {type: Number, default: 1},
  createdAt: {type: String, default: ''},
  updateAt: {type: String, default: ''},
  // 1为公开，0为不公开
  isPubilc: {type: Number, default: 1},
  commentNum: Number,
  options: String
});

let category = new Schema({
  name: String,
  pid: Number,
  pathName: String
});

let option = new Schema({
  key: String,
  value: String,
  desc: String
});

let postCategory = new Schema({
  postID: Number,
  categoryID: Number
});

let postTag = new Schema({
  name: String,
  pathName: String
});

let tag = new Schema({
  name: String,
  pathName: String
});

let user = new Schema({
  name: String,
  displayName: String,
  password: String,
  email: String,
  createdAt: {type: String, default: ''},
  createdIP: String,
  lastLoginTime: Date,
  lastLoginIP: String
});

post = mongoose.model('post', post);
category = mongoose.model('category', category);
option = mongoose.model('option', option);
postCategory = mongoose.model('postCategory', postCategory);
postTag = mongoose.model('postTag', postTag);
tag = mongoose.model('tag', tag);
user = mongoose.model('user', user);

module.exports = {
  db,
  post,
  category,
  option,
  postCategory,
  postTag,
  tag,
  user
};


