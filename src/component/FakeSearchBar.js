import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        image: PropTypes.any,
        touchStyle: PropTypes.any,
        imageStyle: PropTypes.any,
        textStyle: PropTypes.any,
    };

    static get defaultProps() {
        return {
            activeOpacity: 0.9,
        };
    }

    render() {
        const {placeholder, image, onFocus, activeOpacity, touchStyle, imageStyle, textStyle} = this.props;
        return (
            <TouchableOpacity onPress={onFocus} style={touchStyle}  activeOpacity={activeOpacity}>
                <Image
                    source={image || require('../image/input_search.png')}
                    style={imageStyle}
                />
                <Text style={textStyle} numberOfLines={1}>
                    {placeholder}
                </Text>
            </TouchableOpacity>
        );
    }
}