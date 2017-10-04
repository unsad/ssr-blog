/**
 * Created by unsad on 2017/9/20.
 */
import { app, router, store } from './main';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  router.push(context.url);

  const s = isDev && Date.now();

  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store, context);
    }
  })).then(() => {
    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
    context.initialState = store.state;
    return app;
  });
}
