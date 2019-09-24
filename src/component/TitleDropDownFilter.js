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
        initialSelect: PropTypes.number, // 初始选择
        onSelect: PropTypes.func.isRequired, // 选中数据，(data, index) => undefined
        onPressCancel: PropTypes.func.isRequired, // 点击空白区域取消操作，() => undefined
        showY: PropTypes.number.isRequired, // 纵向偏移值，从何处开始显示下拉框
        selectedColor: PropTypes.string, // 选中文字的颜色
        unselectedColor: PropTypes.string, // 未选中文字的颜色
    };

    _renderRow = (row, index) => {
        let textColor = this.props.initialSelect === index ? '#e15151' : '#333333';
        if(this.props.selectedColor && this.props.unselectedColor){
            textColor = this.props.initialSelect === index ? this.props.selectedColor : this.props.unselectedColor;
        }
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.97}
                onPress={() => {
                    this.refs['filter'].onSelect(row, index);
                }}
            >
                <View style={styles.row}>
                    <Text numberOfLines={1} style={[styles.rowText, {color:textColor}]}>
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
