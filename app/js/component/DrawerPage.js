/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
} from 'react-native'

export default class DrawerPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('DrawerPage=>componentDidMount',);
    }

    componentWillUnmount() {
        console.log('DrawerPage=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> DrawerPage </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
