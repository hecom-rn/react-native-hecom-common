import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        title: PropTypes.string, // 标题
        onPress: PropTypes.func, // 点击事件
        imageStatus: PropTypes.bool.isRequired, // 是否已点击
    };

    static get defaultProps() {
        return {
            title: '',
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,
        });
    }

    render() {
        const { title, onPress, imageStatus } = this.state;
        const {style, textStyle, imageStyle} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.view, style]}>
                    <Text style={[styles.text, textStyle]}>
                        {title}
                    </Text>
                    <Image
                        source={imageStatus ? arrow_up : arrow_down}
                        style={[styles.image, imageStyle]}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const arrow_up = require('../image/arrow_up.png');
const arrow_down = require('../image/arrow_down.png');

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#394352',
        textAlign: 'center',
    },
    image: {
        width: 11,
        height: 11,
        marginLeft: 6,
    },
});
