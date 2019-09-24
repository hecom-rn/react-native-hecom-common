import React from 'react';
import { Animated, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';

/**
 * 通用的下拉筛选页面。
 */
export default class extends React.Component {
    static propTypes = {
        dataSource: PropTypes.array.isRequired, // 数据数组
        onSelect: PropTypes.func.isRequired, // 选中数据，(data,index) => undefined
        onPressCancel: PropTypes.func.isRequired, // 点击空白区域取消操作，() => undefined
        renderRow: PropTypes.func.isRequired, // 提供行视图，(data, index) => React.Component
        showY: PropTypes.number.isRequired, // 纵向偏移值，从何处开始显示下拉框
        rowOffset: PropTypes.func, // 行首距离顶部的偏移值计算，(rowIndex) => number
        totalHeight: PropTypes.number, // 总视图高度
    };

    static get defaultProps() {
        return {
            rowOffset: (rowIndex) => 48 * rowIndex,
            totalHeight: 48 * 7.7,
        };
    }

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(-props.totalHeight);
        this.state = {
            rawData: props.dataSource,
        };
    }

    componentDidMount() {
        this.show();
    }

    show = () => {
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    hide = (func) => {
        Animated.timing(this.animatedValue, {
            toValue: -this.props.totalHeight,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            this.props.onPressCancel && this.props.onPressCancel();
            typeof func === "function" && func();
        });
    };

    onSelect = (data, index) => {
        this.props.onSelect(data, index)
    };

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.hide}
            >
                <Animated.View style={[{top: this.props.showY}, styles.container, {
                    opacity: this.animatedValue.interpolate({
                        inputRange: [-this.props.totalHeight, 0],
                        outputRange: [0, 1]
                    })
                }]}>
                    <Animated.View
                        style={{height: this.props.totalHeight, transform: [{translateY: this.animatedValue}]}}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={true}
                            bounces={false}
                            scrollEventThrottle={1}
                        >
                            {this.state.rawData.map(this.props.renderRow)}
                        </ScrollView>
                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 65535,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
    }
});