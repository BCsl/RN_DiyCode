/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class TopicsPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('TopicsPage=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('TopicsPage=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> TopicsPage </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});