import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

/**
 * 加载中的圆圈。
 */
export default class extends React.Component {
    static propTypes = {
        animating: PropTypes.bool, // 是否正在展示
        color: PropTypes.string, // 圆圈的颜色
        size: PropTypes.oneOf(['small', 'large']), // 圆圈的大小
        toast: PropTypes.bool, // 是Toast还是Spinner
        style: PropTypes.object, // 样式集合
        text: PropTypes.string, // 展示文字
    };

    static get defaultProps() {
        return {
            animating: true,
            color: 'gray',
            size: 'small',
            toast: false,
        };
    }

    _renderToast = () => {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.wrapper}>
                        <ActivityIndicator color='white' size='large' />
                        {text && (
                            <Text style={styles.toast}>
                                {text}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    _renderSpinner = () => {
        const {color, size, text} = this.props;
        return (
            <View style={styles.spinner}>
                <ActivityIndicator color={color} size={size} />
                {text && (
                    <Text style={[styles.tip]}>
                        {text}
                    </Text>
                )}
            </View>
        );
    };

    render() {
        const {animating, toast} = this.props;
        if (animating) {
            return toast ? this._renderToast() : this._renderSpinner();
        } else {
            return null;
        }
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: 99
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 89,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 89,
        height: 89,
        borderRadius: 6,
        backgroundColor: 'rgba(58, 58, 58, 0.9)'
    },
    tip: {
        color: '#999',
        fontSize: 14,
        marginLeft: 8
    },
    toast: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4
    },
    spinner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
};