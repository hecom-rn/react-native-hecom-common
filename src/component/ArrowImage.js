import React from 'react';
import { StyleSheet, Image } from 'react-native';

/**
 * 右箭头，包含左右边距。
 */
export default class extends React.Component {
    render() {
        return (
            <Image source={arrow_image} style={[styles.image, this.props.style]} />
        );
    }
}

const arrow_image = require('../image/arrow_right.png');

const styles = StyleSheet.create({
    image: {
        width: 13,
        height: 16,
        marginLeft: 10,
        marginRight: 15,
    },
});