/**
 * Created by chensuilun on 2017/9/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native';

export default class NewsItem extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('NewsItem=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('NewsItem=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> NewsItem </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});