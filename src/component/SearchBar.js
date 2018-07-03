import React from 'react';
import { View, TouchableOpacity,Text, StyleSheet, Keyboard, Image } from 'react-native';
import TextInput from './TextInput';

/**
 * 通用搜索控件。
 */
export default class extends React.Component {
    /**
     * autoFocus：是否自动focus
     * searchText：搜索文字
     * placeholder：占位文字
     * onPressCancel：取消操作
     * onSubmitEditing: 提交编辑
     * onChangeText:文字变更
     * hasCancel：是否有取消按钮
     * isSearching：是否处于搜索中状态
     */

    static get defaultProps() {
        return {
            autoFocus: false,
            hasCancel: false,
            isSearching: true,
        };
    }

    render() {
        return (
            <View style={[styles.headerContainer, this.props.style]}>
                <View style={styles.inputContainer}>
                    <Image source={search_image} style={styles.searchImage} />
                    <TextInput
                        ref={(ref) => this.searchInput = ref}
                        style={styles.searchInput}
                        placeholder={this.props.placeholder || '搜索'}
                        placeholderTextColor='#999999'
                        returnKeyType='search'
                        onSubmitEditing={this.props.onSubmitEditing}
                        autoFocus={this.props.autoFocus}
                        value={this.props.searchText}
                        onChangeText={this.props.onChangeText}
                        onFocus={() => this.props.onChangeText(this.props.searchText)}
                        autoCorrect={false}
                        clearButtonMode="never"
                    />
                    {this.props.isSearching && (
                        <TouchableOpacity
                            style={styles.emptyInputContainer}
                            onPress={this.props.onChangeText.bind(this,'')}
                        >
                            <Image source={search_empty_image} style={styles.searchEmpty} />
                        </TouchableOpacity>
                    )}
                </View>
                {this.props.hasCancel && this.props.isSearching && (
                    <TouchableOpacity
                        style={styles.cancelContainer}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.onPressCancel && this.props.onPressCancel();
                        }}
                    >
                        <Text style={styles.cancelText}>
                            取消
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const search_image = require('../image/search.png');
const search_empty_image = require('../image/search_empty.png');

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 8,
        height: 35,
        backgroundColor: '#e6e8ea',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchImage: {
        marginLeft: 10,
        width: 16,
        height: 16,
    },
    searchInput: {
        marginLeft: 6,
        fontSize: 15,
        color: '#333333',
        flex: 1,
    },
    emptyInputContainer: {
        width: 34,
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchEmpty: {
        width: 14,
        height: 14,
    },
    cancelContainer: {
        width: 62,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#999999',
    },
});