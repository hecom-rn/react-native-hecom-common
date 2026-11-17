import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * 表格中的分隔线。
 */
export default class extends React.Component {
    static propTypes = {
        lineColor: PropTypes.string,
        style: PropTypes.any,
    };

    static get defaultProps() {
        return {
            lineColor: '#e6e6e6',
        };
    }

    render() {
        const {lineColor, style} = this.props;
        // hairlineWidth 为亚像素高度（≈1/density），鸿蒙 RNOH 渲染时部分行间取整为 0 导致分隔线
        // 系统性缺失（bug 71101444 变更单列表 / 71120051 分析列表），鸿蒙改用 1dp 实高兜底
        const height = Platform.OS === 'harmony' ? 1 : StyleSheet.hairlineWidth;
        return (
            <View
                style={[{
                    backgroundColor: lineColor,
                    height,
                }, style]}
            />
        );
    }
}
