import React, { Component } from 'react';
import { ActivityIndicator, View, Button, FlatList, Image, Text } from 'react-native';
import { Input } from './common';

class Container extends Component {
	state = { searchQuery: '', cardResults: {}, loading: false };

	searchCards() {
		this.setState({ 
			loading: true,
			cardResults: {}
		 });
		fetch(`http://api.magicthegathering.io/v1/cards?${this.state.searchQuery}`)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({ cardResults: responseJson.cards });
			this.setState({ loading: false });
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
		} else if (this.state.cardResults && !this.state.loading) {
			return(
				<FlatList
					data={this.props.cardResults}
					// keyExtractor={card.id}
					renderItem={({item}) => (
						<View>
							<Image source={item.imageUrl} />
							<Text>{item.name}</Text>
							<Text>{item.type} | {item.rarity}</Text>
						</View>
					)}
				/>
			);
		}
	}


	render() {
		const { searchViewStyle, containerViewStyle, buttonStyle, inputStyle } = styles;
		
		return (
			<View style={containerViewStyle}>
				<View style={searchViewStyle}>
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
						style = {buttonStyle}
						onPress={this.searchCards.bind(this)}
						title="Search"
						accessibilityLabel="Search Cards"
					/>
				</View>
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
        alignItems: "flex-start",
	},
	searchViewStyle: {
		flex: 1,
		flexDirection: "row",
		alignSelf: "stretch",
		alignItems: "flex-start",
	},
	inputStyle: {
		flex: 2,
	},
	buttonStyle: {
		flex: 0.5,
	},
};

export { Container };