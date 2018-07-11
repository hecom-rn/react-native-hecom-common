import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        style: PropTypes.any,
    };

    static get defaultProps() {
        return {
            activeOpacity: 0.9,
        };
    }

    render() {
        const {placeholder, onFocus, style, activeOpacity} = this.props;
        return (
            <TouchableOpacity onPress={onFocus} style={[styles.touch, style]}  activeOpacity={activeOpacity}>
                <Image
                    source={require('../image/input_search.png')}
                    style={styles.image}
                />
                <Text style={styles.text} numberOfLines={1}>
                    {placeholder}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    touch: {
        flex: 1,
        height: 35,
        marginLeft: 16,
        marginRight: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8e8ea',
    },
    image: {
        marginLeft: 10,
        width: 16,
        height: 16,
    },
    text: {
        marginLeft: 6,
        fontSize: 15,
        color: '#999999',
        flex: 1
    },
};