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
                let fixedResult = [];
                for (let site of category.data) {
                    site.key = site.name;
                }
                for (let index = 0; index < category.data.length; index++) {
                    category.data[index].key = category.data[index].name;
                    let fixIndex = Number.parseInt(index / 2);
                    let arrayIndex = index % 2;
                    let array = fixedResult[fixIndex];
                    if (array == null) {
                        array = new Array();
                        fixedResult[fixIndex] = array;
                    }
                    array[arrayIndex] = category.data[index];
                }
                category.data = fixedResult;
                console.log('SiteContainer', fixedResult);
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);
