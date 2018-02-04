import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, autoCorrect, secureTextEntry }) => {
	const { inputStyle, containerStyle } = styles;
	return (
		<View style={containerStyle}>
			<TextInput
                underlineColorAndroid='transparent'
				secureTextEntry={secureTextEntry}
				autoCorrect={autoCorrect}
				placeholder={placeholder}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

const styles = {
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
        lineHeight: 23,
        width: '100%',
        // flex: 1,
        // alignSelf: "stretch",        
	},
	containerStyle: {
        flex: 2,
        height: 40,
        width: '70%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 10,
        marginRight: 10,
	}
}

export { Input };