import React from 'react';
import { View, StyleSheet } from 'react-native';
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
            style: null,
        };
    }

    render() {
        const {lineColor, style} = this.props;
        return (
            <View
                style={[{
                    backgroundColor: lineColor,
                    height: StyleSheet.hairlineWidth,
                }, style]}
            />
        );
    }
}