/**
 * Created by chensuilun on 2017/9/11.
 */

import {connect} from 'react-redux';
import SitesPage from '../component/site/SitesPage';
import getSitesAction from '../action/SiteAction';

const mapStateToProps = (state) => {
    let sitesState = null;
    if (state.site.result != null) {
        sitesState = state.site.result.slice();
        for (let category of sitesState) {
            category.key = category.name;
            category.data = category.sites.slice();
            if (category.data != null) {
                for (let site of category.data) {
                    site.key = site.name;
                }
            }
        }
    }
    return {
        ...state.site,
        result: sitesState,
        rootNavigator: state.nav,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSites: (forceUpdate = false)=> {
            dispatch(getSitesAction(forceUpdate));
        },
        onPressListener: (url)=> {
            "use strict";
            console.log('SiteContainer click', url);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);
