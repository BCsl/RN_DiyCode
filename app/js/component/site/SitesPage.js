/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    SectionList,
}from'react-native';
import  SiteHeader from './SiteHeader';
import  SiteItem from './SiteItem';

export default class SitesPage extends Component {

    constructor() {
        super();
        this._onRefresh = this._onRefresh.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderSectionHeader = this._renderSectionHeader.bind(this);
    }

    componentDidMount() {
        console.log('SitesPage=>componentDidMount');
        this._onRefresh();
    }

    componentWillUnmount() {
        console.log('SitesPage=>componentWillUnmount',);
    }

    render() {
        let {isRefreshing, isError, message, result} = this.props;
        console.log('SitesPage', result);
        if (result == null) {
            return null;
        }
        return (
            <View style={styles.container}>
                <SectionList
                    keyExtractor={(item, index)=>index}
                    refreshing={isRefreshing}
                    onRefresh={()=>this._onRefresh(true)}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                    sections={result}
                    renderSectionHeader={this._renderSectionHeader}
                >
                </SectionList>
            </View>
        )
    }


    _onRefresh(forceUpdate = false) {
        let {isRefreshing, fetchSites} = this.props;
        if (!isRefreshing) {
            fetchSites(forceUpdate);
        }
    }

    _renderSectionHeader({section}) {
        return <SiteHeader name={section.name}></SiteHeader>;
    }

    _renderItem({item, index}) {
        return <SiteItem item={item} index={index} pressedListener={this.props.onPressListener}></SiteItem>;
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: 5,
        backgroundColor: '#00000000'
    },
    header: {
        height: 10,
        backgroundColor: '#00000000'
    },
});