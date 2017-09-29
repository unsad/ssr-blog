/**
 * Created by unsad on 2017/9/20.
 */
import { app, store } from './main';

store.replaceState(window.__INITIAL_STATE__);
app.$mount('#app');
