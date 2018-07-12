import { Platform, Dimensions } from 'react-native';

console.ignoredYellowBox = ['Remote debugger'];
global.isIos = Platform.OS === 'ios';
global.isAndroid = Platform.OS === 'android';
global.screenWidth = () => Dimensions.get('window').width;
global.screenHeight = () => Dimensions.get('window').height;
