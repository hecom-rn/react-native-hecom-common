import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        style: PropTypes.any,
    };

    render() {
        const {placeholder, onFocus, style} = this.props;
        return (
            <View style={[styles.containerStyle, style]}>
                <TouchableOpacity
                    onPress={onFocus}
                    style={styles.buttonStyle}
                    activeOpacity={1}
                >
                    <Image
                        source={require('../image/input_search.png')}
                        style={styles.image}
                    />
                    <Text style={styles.placeholder}>
                        {placeholder}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        height: 40,
    },
    buttonStyle: {
        marginLeft: 12,
        marginRight: 12,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#f5f5f6',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: 13,
        height: 13,
        marginLeft: 10,
    },
    placeholder: {
        fontSize: 14,
        color: '#9c9fa5',
        marginLeft: 4,
    },
};