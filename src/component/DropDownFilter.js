import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

/**
 * 通用的下拉筛选页面。
 */
export default class extends React.Component {
    static propTypes = {
        dataSource: PropTypes.array.isRequired, // 数据数组
        onSelect: PropTypes.func.isRequired, // 选中数据，(data) => undefined
        onPressCancel: PropTypes.func.isRequired, // 点击空白区域取消操作，() => undefined
        renderRow: PropTypes.func.isRequired, // 提供行视图，(data, index) => React.Component
        showY: PropTypes.number.isRequired, // 纵向偏移值，从何处开始显示下拉框
        rowOffset: PropTypes.func, // 行首距离顶部的偏移值计算，(rowIndex) => number
        totalHeight: PropTypes.number, // 总视图高度
    };

    static get defaultProps() {
        return {
            rowOffset: (rowIndex) => 48 * rowIndex,
            totalHeight: 48 * 5,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            rawData: props.dataSource,
            canStartScroll: false,
        };
        this.canScrollToTop = false;
    }

    componentDidMount() {
        this.show();
    }

    show = () => {
        this.scrollView.scrollTo({x: 0, y: this.props.rowOffset(this.state.rawData.length), animated: false});
        setTimeout(() => {
            this.scrollView && this.scrollView.scrollTo({x: 0, y: 0, animated: true});
            setTimeout(() => {
                this.setState({
                    canStartScroll: true,
                });
            }, 500);
        }, 5);
    };

    hide = (func) => {
        this.onSelect(undefined, func);
    };

    onSelect = (data, func) => {
        let time = 0;
        this.canScrollToTop = true;
        if (Platform.OS === 'ios') {
            time = 250;
            this.scrollView.scrollTo({x: 0, y: this.props.rowOffset(this.state.rawData.length), animated: true});
        } else {
            time = 0;
        }
        this.timer = setTimeout(
            () => {
                if (typeof data === 'undefined') {
                    this.props.onPressCancel();
                } else {
                    this.props.onSelect(data);
                }
                if (typeof func === "function") {
                    func();
                }
            },
            time,
        );
    };

    onScroll = (event) => {
        if (!this.state.canStartScroll) {
            return;
        }
        const len = this.state.rawData.length;
        const listLen = this.props.rowOffset(len);
        if (listLen <= this.props.totalHeight && !this.canScrollToTop) {
            this.scrollView.scrollTo({x: 0, y: 0, animated: false});
        } else {
            const deltaY = listLen - event.nativeEvent.contentOffset.y;
            if (deltaY < this.props.totalHeight && !this.canScrollToTop) {
                this.scrollView.scrollTo({
                    x: 0,
                    y: 48 * this.state.rawData.length - this.props.totalHeight,
                    animated: false
                });
            }
        }
    };

    render() {
        return (
            <TouchableOpacity
                style={[{top: this.props.showY}, styles.container]}
                activeOpacity={1.0}
                onPress={this.hide}
            >
                <View style={{height: this.props.totalHeight}}>
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        showsVerticalScrollIndicator={true}
                        bounces={false}
                        scrollEventThrottle={1}
                        onScroll={this.onScroll}
                    >
                        {this.state.rawData.map(this.props.renderRow)}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'visible',
        zIndex: 65535,
    },
});