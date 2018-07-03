import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import ActionSheetAndroid from './AndroidContainer';
import RNTopview from './RNTopView';

let ActionSheet = ActionSheetIOS;
if (Platform.OS !== 'ios') {
    let instance = void 0;
    const saveInstance = (i) => {
        instance = i;
    };
    const onAnimationEnd = (visible) => {
        if (!visible) {
            RNTopview.remove();
        }
    };
    ActionSheet = {
        showActionSheetWithOptions: (config, callback) => {
            RNTopview.set(
                <ActionSheetAndroid
                    visible={true}
                    ref={saveInstance}
                    onAnimationEnd={onAnimationEnd}
                    config={config}
                    callback={callback}
                />
            );
        },
        showShareActionSheetWithOptions: (config) => {
            RNTopview.set(
                <ActionSheetAndroid
                    visible={true}
                    ref={saveInstance}
                    onAnimationEnd={onAnimationEnd}
                    config={config}
                    share={true}
                />
            );
        },
        close: () => {
            if (instance) {
                instance.close();
            }
        }
    };
}

exports["default"] = ActionSheet;
module.exports = exports['default'];