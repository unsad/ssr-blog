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
    item: [],
    achieves: {},
    siteInfo: {
      github_url: {
        value: ''
      },
      title: {
        value: ''
      },
      logo_url: {
        value: ''
      }
    }
  },
  actions: {
    FETCH_ITEMS: ({commit, state}, {queryJSON, page}) => {
      return api.fetchBlogByPage(queryJSON, page).then(items => commit('SET_ITEMS', {items}));
    },
    FETCH_ACHIEVE: ({commit, state}) => {
      return api.fetchAllBlog().then(items => {
        let sortedItem = items.reduce((prev, curr) => {
          let time = curr.createdAt.slice(0, 7).replace('-', '年') + '月';
          if (typeof prev[time] === 'undefined') {
            prev[time] = [curr];
          } else {
            prev[time].push(curr);
          }
          return prev;
        }, {});
        commit('SET_ACHIEVE', { sortedItem });
      });
    },
    FETCH_OPTIONS: ({commit, state}) => {
      return api.fetchOption().then(optionArr => {
        let obj = optionArr.reduce((prev, curr) => {
          prev[curr.key] = curr;
          return prev;
        }, {});
        commit('SET_OPTIONS', { obj });
      });
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
    SET_ACHIEVE: (state, {sortedItem}) => {
      Vue.set(state, 'achieves', sortedItem);
    },
    SET_OPTIONS: (state, { obj }) => {
      Vue.set(state, 'siteInfo', obj);
    }
  },
  getters: {
    items (state, getters) {
      const { items, itemsPerPage} = state;
      return items;
    },
    siteInfo(state, getters) {
      const {siteInfo} = state;
      return siteInfo;
    },
    achieves(state, getters) {
      const {achieves} = state;
      return achieves;
    }
  }
});
