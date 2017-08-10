/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export default class NewsPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('NewsPage=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('NewsPage=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> NewsPage </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


