import ItemList from '../comtainers/List.vue';

export default function (options) {
  return {
    name: `${options.name}-list-view`,
    asyncData({store}) {
      return store.dispatch('FETCH_LIST', options);
    },
    render(h) {
      return h(ItemList, {props: {options: options}});
    }
  }
}
