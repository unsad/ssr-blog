/**
 * Created by unsad on 2017/10/14.
 */
import Item from '../containers/Create.vue'

export default function(options) {
  return {
    name: `${options.name}-create-view`,
    asyncData({store}) {
      return store.dispatch('FETCH_LIST', options);
    },
    render(h) {
      return h(Item, {props: {options}});
    }
  }
}
