declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
  export interface VueClass<V extends Vue> {
    asyncData?: any
  }
}