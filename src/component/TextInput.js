import React from 'react';
import { TextInput } from 'react-native';

export default class extends React.Component {
    render() {
        const {reference} = this.props;
        return (
            <TextInput
                underlineColorAndroid="transparent"
                clearButtonMode='while-editing'
                placeholderTextColor='#bbbbbb'
                {...this.props}
                ref={(v) => {
                    reference && reference(v);
                }}
                style={[{
                    fontSize: 16,
                    color: '#000000',
                    padding: 0,
                }, this.props.style]}
            />
        );
    }
}