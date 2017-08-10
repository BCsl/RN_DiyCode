/**
 * Created by chensuilun on 2017/7/31.
 */
export default logger = store => next => action => {
    console.log('------Logger---Start---:', action);
    next(action);
    console.log('------Logger---End---:', store.getState());
}
