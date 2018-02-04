import React, { Component } from 'react';
import { ActivityIndicator, View, Button, FlatList, Image, Text, ScrollView } from 'react-native';
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
		const { cardResult, cardDetailsStyle } = styles;

		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator />
					<Text>Loading...</Text>									
				</View>
			);
		}

		return this.state.cardResults.map((card) => {
			return (
				<View key={card.id} style={cardResult}>
					<Image 
						source={{uri: `${card.imageUrl}`}} 
						style={{width: 100, height: 150, margin: 10}}
					/>
					<View style={cardDetailsStyle}>
						<Text>{card.name}</Text>
						<Text>{card.type} | {card.rarity}</Text>
					</View>
				</View>
			)
		})
	}


	render() {
		const { containerViewStyle, inputStyle, buttonStyle, contentContainer } = styles;
		
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
				<ScrollView contentContainerStyle={contentContainer} style={{width: "100%"}}>
					{this.renderCardsList()}
				</ScrollView>
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
		margin: 5,
	},
	inputStyle: {
		flex: 1,
		width: '70%',
	},
	buttonStyle: {
		flex: 1,
		alignSelf: "stretch",
		width: '100%',
	},
	cardResult: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		height: 200,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
	},
	cardDetailsStyle: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start"
	},
	contentContainer: {
		paddingVertical: 20,
	}
};

export { Container };