/**
 * Created by chensuilun on 2017/9/20.
 */

import {connect} from 'react-redux';
import DrawerPage from '../component/DrawerPage';

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatchAction: (action)=> {
            props.closeDrawer();
            dispatch(action);
        },
    }
}

export default connect(null, mapDispatchToProps)(DrawerPage);
