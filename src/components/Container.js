import React, { Component } from 'react';
import { ActivityIndicator, View, Button, FlatList, Image, Text } from 'react-native';
import { Input } from './common';

class Container extends Component {
	state = { searchQuery: '', cardResults: [], loading: false };

	searchCards() {
		this.setState({ 
			loading: true,
			cardResults: []
		 });
		fetch(`http://api.magicthegathering.io/v1/cards?name=${this.state.searchQuery}&pageSize=10`)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({ 
				cardResults: responseJson.cards,
				loading: false
			 });
			console.log(this.state.cardResults);
		})
		.catch((error) => {
			this.setState({ loading: false });
			console.error(error);
		});
	}

	renderCardsList() {
		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator />
					<Text>Loading...</Text>									
				</View>
			);
		}

		console.log(this.state.cardResults);
		return this.state.cardResults.map((card) => {
			return (
				<View key={card.id}>
					<Image 
						source={{uri: `${card.imageUrl}`}} 
						style={{width: 50, height: 50}}
					/>
					<Text>{card.name}</Text>
					<Text>{card.type} | {card.rarity}</Text>
				</View>
			)
		})
	}


	render() {
		const { containerViewStyle, inputStyle, buttonStyle } = styles;
		
		return (
			<View style={containerViewStyle}>

				<Input
					style={inputStyle}
					secureTextEntry={false}
					autoCorrect={false}
					placeholder="Search"
					label="Search"
					value={this.state.searchQuery}
					onChangeText={searchQuery => this.setState({ searchQuery })}
				/>
				<Button
					style={buttonStyle}
					onPress={this.searchCards.bind(this)}
					title="Search"
					accessibilityLabel="Search"
				/>
				<View>
					{this.renderCardsList()}
				</View>
			</View>
		);
	}
};

const styles = {
	containerViewStyle: {
		flex: 1,
		flexDirection: "column",
		alignSelf: "stretch",		
		alignItems: "center",
		padding: 5,
	},
	inputStyle: {
		flex: 1,
	},
	buttonStyle: {
		flex: 1,
		alignItems: "flex-start",
		alignSelf: "stretch",
	}
};

export { Container };