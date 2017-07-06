<template>
  <div class="hello">
    <template v-if="isLogin === false">
      <tip :should-tip-show="shouldTipShow" type="success" text="placeholder"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar :current-route="currentRoute"></sidebar>
      <dashboard :current-route="currentRoute" v-if="currentRoute.indexOf('/dashboard') > -1"></dashboard>
      <post-list :current-route="shouldTipShow" v-if="currentRoute === '/post/list'"></post-list>
      <page-list :current-route="currentRoute" v-if="currentRoute === '/page/list'"></page-list>
      <tag-list :current-route="currentRoute" v-if="currentRoute === '/tag/list'"></tag-list>
      <tag-create :current-route="currentRoute" v-if="currentRoute === '/tag/create'"></tag-create>
      <cate-list :current-route="currentRoute" v-if="currentRoute === '/cate/list'"></cate-list>
      <cate-create :current-route="currentRoute" v-if="currentRoute === '/cate/create'"></cate-create>
      <user-edit :current-route="currentRoute" v-if="currentRoute === '/user/edit_pwd'"></user-edit>
      <user-list :current-route="currentRoute" v-if="currentRoute === '/user/list'"></user-list>
      <option-general :current-route="currentRoute" v-if="currentRoute === '/option/general'"></option-general>
      <option-comment :current-route="currentRoute" v-if="currentRoute === '/option/comment'"></option-comment>
      <option-analytic :current-route="currentRoute" v-if="currentRoute === '/option/analytic'"></option-analytic>
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'placeholder'"></tip>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './Login';
import Tip from './Tip';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import PostList from './PostList';
import PageList from './PageList';
import TagCreate from './TagCreate';
import CateCreate from './CateCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import OptionGeneral from './OptionGeneral';
import OptionComment from './OptionComment';
import OptionAnalytic from './OptionAnalytic';

export default {
  name: 'hello',
  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {},
      currentRoute: '/dashboard'
    }
  },
  components: {
    Login,
    Tip,
    Sidebar,
    Dashboard,
    PostList,
    PageList,
    TagCreate,
    CateCreate,
    UserEdit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
