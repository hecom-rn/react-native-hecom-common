import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Modal from 'rc-dialog/lib/Modal';

export default class ActionSheetAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible || false
        };
    }
    confirm = (index) => {
        const callback = this.props.callback;
        if (callback) {
            callback(index);
        }
        this.setState({
            visible: false
        });
    };

    render() {
        const _this2 = this;
        const { config, share, onAnimationEnd } = this.props;
        const { title, message, url, options, destructiveButtonIndex,
            cancelButtonIndex, excludedActivityTypes } = config;

        const titleMsg = share ?
            url &&
            <View style={defaultAndroidStyles.title} key={'0'}>
                <Text>{url}</Text>
            </View>
            :
            title &&
            <View style={defaultAndroidStyles.title} key={'0'}>
                <Text style={defaultAndroidStyles.titleText}>
                    {title}
                </Text>
            </View>;
        const content = share ?
            excludedActivityTypes.map((item, index) => {
                return (
                    <View key={index}>
                        {item}
                    </View>
                );
            }) :
            options.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={[cancelButtonIndex === index ? defaultAndroidStyles.cancelBtn : null]}
                    >
                        <TouchableHighlight
                            style={[defaultAndroidStyles.btn]}
                            underlayColor='#ddd'
                            onPress={() => { return _this2.confirm(index); }}
                        >
                            <Text
                                style={[destructiveButtonIndex === index ? defaultAndroidStyles.destructiveBtn : null]}
                            >
                                {item}
                            </Text>
                        </TouchableHighlight>
                        {
                            cancelButtonIndex === index ?
                                <View style={defaultAndroidStyles.cancelBtnMask} /> : null
                        }
                    </View>
                );
            });

        return (
            <View style={defaultAndroidStyles.container}>
                <Modal
                    animationDuration={200}
                    animateAppear={true}
                    visible={this.state.visible}
                    onAnimationEnd={onAnimationEnd}
                    style={defaultAndroidStyles.content}
                    animationType={'slide-up'}
                    maskClosable={true}
                    onClose={() => { return _this2.confirm(cancelButtonIndex || -1); }}
                >
                    <View>
                        {titleMsg}
                        {
                            message &&
                            <View style={defaultAndroidStyles.message} key={'1'}>
                                <Text>{message}</Text>
                            </View>
                        }
                        <View>{content}</View>
                    </View>
                </Modal>
            </View >
        );
    }
}

ActionSheetAndroid.defaultProps = {
    share: false
};
exports["default"] = ActionSheetAndroid;
module.exports = exports['default'];

const defaultAndroidStyles =
    StyleSheet.create({
        container: {
            zIndex: 1000,
        },
        wrap: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0
        },
        content: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff'
        },
        mask: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, .4)'
        },
        title: {
            flex: 1,
            alignItems: 'center',

            marginTop: 15,
            marginBottom: 15
        },
        titleText: {
            fontWeight: '500'
        },
        message: {
            flex: 1,
            alignItems: 'center',

            marginBottom: 15
        },
        btn: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            marginLeft: 16,
            height: 42,
            borderStyle: 'solid',
            borderTopWidth: 0.5,
            borderTopColor: '#e6e8ea',
            backgroundColor: 'white'
        },
        cancelBtn: {
            marginTop: 9,
            position: 'relative'
        },
        cancelBtnMask: {
            position: 'absolute',
            top: -9,
            left: 0,
            right: 0,
            height: 9,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: '#ddd'
        },
        destructiveBtn: {
            color: '#d11f1f',
            fontSize: 14,
        }
    });
