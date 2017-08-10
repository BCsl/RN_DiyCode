/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class SitesPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('SitesPage=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('SitesPage=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Site</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});