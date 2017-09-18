/**
 * Created by unsad on 2017/5/9.
 */
const config = require('../conf/config');
const mongoose = require('mongoose');
const log = require('../utils/log');
mongoose.Promise = global.Promise;
let mongoUrl = '127.0.0.1:27017/blog';

mongoose.connect(mongoUrl);

let db = mongoose.connection; // 监控数据库变化
db.on('error', (err) => log.error('connect error:', err));
db.once('open', () => log.debug('MongoDB is ready!'));

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
  postID: String,
  categoryID: String
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
  lastLoginTime: String,
  lastLoginIP: String
});

let update = new Schema({
  name: String,
  version: String,
  path: String
});

post.methods.next = async function() {
  let model = this.model('post');
  let quote;
  try {
    quote = await model.findOne().where('_id').gt(this._id).sort({_id: 1}).exec();
  } catch (err) {
    console.log(err);
  }
  if (quote) {
    return quote;
  } else {
    return {};
  }
};

post.methods.prev = async function() {
  let model = this.model('post');
  let quote;
  try {
    quote = await model.findOne().where('_id').lt(this._id).sort({_id: -1}).exec();
  } catch (err) {
    console.log(err);
  }
  if (quote) {
    return quote;
  } else {
    return {};
  }
};

post = mongoose.model('post', post);
category = mongoose.model('category', category);
option = mongoose.model('option', option);
postCategory = mongoose.model('postCategory', postCategory);
postTag = mongoose.model('postTag', postTag);
tag = mongoose.model('tag', tag);
user = mongoose.model('user', user);
update = mongoose.model('update', update);

module.exports = {
  post,
  category,
  option,
  postCategory,
  postTag,
  tag,
  user,
  update
};


