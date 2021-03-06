/**
 * Created by unsad on 2017/10/15.
 */
import Item from '../containers/Post.vue'

export default function (options) {
  return {
    name: `${options.name}-markdown-view`,
    asyncData({store}) {
      return store.dispatch('FETCH_LIST', options);
    },
    render(h) {
      return h(Item, {props: {options}});
    }
  }
}
