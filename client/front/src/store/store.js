/**
 * Created by unsad on 2017/9/25.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import api from './index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    itemsPerPage: 10,
    item: []
  },
  actions: {
    FETCH_ITEMS: ({commit, state}, {queryJSON, page}) => {
      return api.fetchBlogByPage(queryJSON, page).then(items => commit('SET_ITEMS', {items}));
    },
    FETCH_USER: ({commit, state}, {id}) => {
      return state.users[id] ? Promise.resolve(state.users[id]) : fetchUser(id).then(user => commit('SET_USER', { user }))
    }
  },
  mutations: {
    SET_ITEMS: (state, { items }) => {
      items.forEach((item, index) => {
        if (item) {
          Vue.set(state.items, index, item);
        }
      });
    },
    SET_USER: (state, { user }) => {
      Vue.set(state.users, user.id, user);
    }
  },
  getters: {
    items (state, getters) {
      const { items, itemsPerPage, lists} = state;
      return items;
    }
  }
});
