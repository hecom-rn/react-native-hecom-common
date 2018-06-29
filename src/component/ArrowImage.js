import React from 'react';
import { Image } from 'react-native';

/**
 * 右箭头，包含左右边距。
 */
export default class extends React.Component {
    render() {
        const flattenStyle = require('flattenStyle');
        const outstyle = flattenStyle(this.props.style);
        const style = Object.assign({
            width: 13,
            height: 16,
            marginLeft: 10,
            marginRight: 15,
        }, outstyle);
        return (
            <Image source={arrow_image} style={style} />
        );
    }
}

const arrow_image = require('../image/arrow_right.png');