import Vue from 'vue';
declare module 'src/components/*' {
  export default Vue;
}

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $meta?: () => any;
    siteInfo?: any;
  }
  interface VueConstructor {
    asyncData?: any;
    version: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: any 
  }
}