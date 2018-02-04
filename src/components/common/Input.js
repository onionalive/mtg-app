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
	},
	containerStyle: {
        height: 40,
        alignSelf: "stretch",
        justifyContent: "center",     
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        margin: 10,
	}
}

export { Input };