/**
 * react-navigation 和 redux 整合
 * 1.react-navigation 本来就有自己的状态管理(reducer),对需要整合到 Redux 的 router 的 getStateForAction 方法做代理即可获取新的状态,以这种新式创建 navigator 的 reducer 即可
 * 2.把 navigator 的 reducer 添加到 Redux 的状态树中
 * 3.替换 navigator 的 navigation 属性,主要是把 dispatch 方法替换成 Redux 的 dispatch 方法, navigator 的 state 对象替换成其在 redux 中配置的状态树中的状态,配合 addNavigationHelpers 来完成
 *  navigation 属性会自动往下传递到其下的 Screen,如果 Screen 是 React 视图组件,其下又有 navigator,那么需要你继续修改该 navigator 的 navigation 属性
 * 4.navigation action 可以通过 NavigationActions 方法创建,并通过 Redux 的 dispatch 分发
 *
 * 以上,navigator 的状态被存储在 redux 中，就可以使用 redux 调度 ( dispatch ) 功能来分发导航操作
 *
 * Created by chensuilun on 2017/8/14.
 * https://reactnavigation.org/docs/guides/redux
 */
import AppStack from '../navigators/AppStack';
import {NavigationActions} from 'react-navigation';

const initialState = AppStack.router.getStateForAction(
    AppStack.router.getActionForPathAndParams('Home')
)

// const initialState = {
//     index: 0,
//     routes: [
//         {
//             key: 'InitA',
//             routeName: 'Home',
//             index: 0,
//             routes: [
//                 {key: 'Topics', routeName: 'Topics'},
//                 {key: 'News', routeName: 'News'},
//                 {key: 'Sites', routeName: 'Sites'},
//             ],
//         },
//     ],
// }

export default navReducer = (state = initialState, action) => {
    const nextState = AppStack.router.getStateForAction(action, state);
    return nextState || state;
};