import React from 'react';
import {View} from 'react-native';
import SeperatorLine from './SeperatorLine';
import PropTypes from 'prop-types';

/**
 * 包括横向和纵向的间隔。
 */
export default class extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        weight: PropTypes.number,
        tline: PropTypes.bool,
        bline: PropTypes.bool,
        style: PropTypes.any,
        lineColor: PropTypes.string,
        type: PropTypes.oneOf(['row', 'column']),
    };

    static get defaultProps() {
        return {
            color: '#e7eaeb',
            weight: 8,
            tline: false,
            bline: false,
            style: null,
            lineColor: '#e6e6e6',
            type: 'column'
        };
    }

    render() {
        const {tline, bline, color: backgroundColor, weight, style, type, lineColor} = this.props;
        let w;
        if (type === 'row') {
            w = {width: weight};
        } else {
            w = {height: weight};
        }
        return (
            <View style={[style, {flexDirection: type}]}>
                {tline && <SeperatorLine lineColor={lineColor} />}
                <View style={[{backgroundColor}, w]} />
                {bline && <SeperatorLine lineColor={lineColor} />}
            </View>
        );
    }
}