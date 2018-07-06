import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DropDownFilter from './DropDownFilter';
import PropTypes from 'prop-types';

/**
 * 导航栏的TitleView点击后下拉框。
 */
export default class extends React.Component {
    static propTypes = {
        dataSource: PropTypes.array.isRequired, // 数据数组
        initialSelect: PropTypes.string, // 初始选择
        onSelect: PropTypes.func.isRequired, // 选中数据，(data) => undefined
        onPressCancel: PropTypes.func.isRequired, // 点击空白区域取消操作，() => undefined
        showY: PropTypes.number.isRequired, // 纵向偏移值，从何处开始显示下拉框
    };

    _renderRow = (row) => {
        const textColor = this.props.initialSelect === row ? '#e15151' : '#333333';
        return (
            <TouchableOpacity
                key={row}
                activeOpacity={0.97}
                onPress={() => {
                    this.refs['filter'].onSelect(row);
                }}
            >
                <View style={styles.row}>
                    <Text style={[styles.rowText, {color:textColor}]}>
                        {row}
                    </Text>
                    <View style={styles.rowBorder} />
                </View>
            </TouchableOpacity>
        );
    };

    hide = (func) => {
        this.refs['filter'].hide(func);
    };

    render() {
        return (
            <DropDownFilter
                ref='filter'
                renderRow={this._renderRow}
                {...this.props}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        height: 48,
    },
    rowText: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12,
        marginRight: 12,
        height: 47,
        textAlign: 'center',
        paddingTop: 15,
    },
    rowBorder: {
        marginLeft: 16,
        marginRight: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e6e8ea'
    },
});