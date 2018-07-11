import React from 'react';
import { CameraRoll, Modal, StyleSheet, Text, View, } from 'react-native';
import ActivityIndicator from '../component/ActivityIndicator';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';
import NaviBar from 'react-native-pure-navigation-bar';

export default class extends React.Component {
    static propTypes = {
        imageUrlSource: PropTypes.array.isRequired,
        failImageSource: PropTypes.any.isRequired,
        renderViewForImage: PropTypes.func.isRequired,
        currentIndex: PropTypes.number,
        showHud: PropTypes.bool,
        hudText: PropTypes.string,
        renderRightNavi: PropTypes.func,
        onClose: PropTypes.func,
    };

    static get defaultProps() {
        return {
            imageUrlSource: [],
            currentIndex: 0,
            showHud: false,
            hudText: '',
        };
    }

    constructor(props) {
        super(props);
        const images = [];
        for (let i = 0; i < this.props.imageUrlSource.length; i++) {
            const item = {url: this.props.imageUrlSource[i]};
            images.push(item);
        }
        this.state = {
            activityIndicatorAnimating: false,
            modalVisible: true,
            dataSource: images,
            showHud: typeof this.props.showHud === 'undefined' ? false : this.props.showHud,
            hudText: typeof this.props.hudText === 'undefined' ? false : this.props.hudText,
        };
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    indicator = () => {
        const x = global.screenWidth() * 0.5 - 45;
        const y = global.screenHeight() * 0.5 - 45;
        return (
            <View style={{
                position: 'absolute',
                top: y,
                left: x,
                height: 90,
                width: 90,
            }}
            >
                <ActivityIndicator
                    style={{alignSelf: 'center'}}
                    toast
                    text="请稍候..."
                    animating={true}
                />
            </View>
        );
    };

    textHud = () => {
        const x = global.screenWidth() * 0.5 - 45;
        const y = global.screenHeight() * 0.5 - 45;
        return (
            <View style={{
                position: 'absolute',
                top: y,
                left: x,
                height: 90,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                backgroundColor: 'rgba(58, 58, 58, 0.9)',
            }}
            >
                <Text style={{fontSize: 14, color: 'white'}}>{this.state.hudText}
                </Text>
            </View>
        );
    };

    showHudWithText = (text) => {
        this.setState({
            showHud: true,
            hudText: text,
        });
        this.timer = setTimeout(() => {
            this.setState({
                showHud: false,
            });
        }, 500);
    };

    save = (url, path) => {
        const localUrl = global.isAndroid ? 'file://' + path : '' + path;
        const that = this;
        that.setState({
            activityIndicatorAnimating: true,
        });
        const promise = CameraRoll.saveToCameraRoll(localUrl, "photo");
        promise.then(function () {
            that.setState({
                activityIndicatorAnimating: false,
            });
            that.showHudWithText('保存成功');
        }).catch(function () {
            that.setState({
                activityIndicatorAnimating: false,
            });
            that.showHudWithText('保存失败');
        });
    };

    render() {
        const { renderRightNavi } = this.props;
        return (
            <Modal
                visible={this.state.modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    this.props.onClose();
                }}
            >
                <ImageViewer
                    index={this.props.currentIndex}
                    failImageSource={this.props.failImageSource}
                    imageUrls={this.state.dataSource}
                    loadingRender={this.indicator}
                    renderImage={this.props.renderViewForImage}
                    renderIndicator={(index, size) => <Text style={styles.indicator}>{index + '/' + size}</Text>}
                />
                <NaviBar
                    onLeft={this.props.onClose}
                    style={naviBarStyle}
                    hasSeperatorLine={false}
                    {...(renderRightNavi ? renderRightNavi() : {})}
                />
                {this.state.showHud && this.textHud()}
                {this.state.activityIndicatorAnimating && this.indicator()}
            </Modal>
        );
    }
}

const naviBarStyle = StyleSheet.create({
    container: {position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'transparent'},
});

const styles = StyleSheet.create({
    indicator: {position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 16, color: 'white'}
});
