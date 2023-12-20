import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DropDownFilter from './DropDownFilter';
import PropTypes from 'prop-types';
import Badge from '@hecom/badge';

/**
 * 导航栏的TitleView点击后下拉框。
 */
export default class extends React.Component {
    static propTypes = {
        dataSource: PropTypes.array.isRequired, // 数据数组
        badgeCounts: PropTypes.array, // 徽标数组，value为徽标数，value = 0或者null则不展示，超过99则显示99+
        initialSelect: PropTypes.number, // 初始选择
        onSelect: PropTypes.func.isRequired, // 选中数据，(data, index) => undefined
        onPressCancel: PropTypes.func.isRequired, // 点击空白区域取消操作，() => undefined
        showY: PropTypes.number.isRequired, // 纵向偏移值，从何处开始显示下拉框
        selectedColor: PropTypes.string, // 选中文字的颜色
        unselectedColor: PropTypes.string, // 未选中文字的颜色
        customChildView: PropTypes.func, // 自定义的顶部视图
    };

    _renderRow = (row, index) => {
        const { badgeCounts } = this.props;
        let textColor = this.props.initialSelect === index ? '#e15151' : '#333333';
        if(this.props.selectedColor && this.props.unselectedColor){
            textColor = this.props.initialSelect === index ? this.props.selectedColor : this.props.unselectedColor;
        }
        const count = badgeCounts && badgeCounts.length > index ? badgeCounts[index] : 0;
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
                    {count > 0 && (
                        <Badge
                            maxCount={99}
                            radius={9}
                            bgColor={'#fc3b39'}
                            outSpace={1.5}
                            outBgColor="white"
                            style={{
                                top: -6,
                                marginLeft: -13,
                            }}
                            count={count}
                        />
                    )}
                </View>
                 <View style={styles.rowBorder} />
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
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    rowText: {
        fontSize: 16,
        color: '#333333',
        marginHorizontal: 12,
        textAlign: 'center',
    },
    rowBorder: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e6e8ea'
    },
});
