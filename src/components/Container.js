import React, { Component } from 'react';
import { ActivityIndicator, View, Button, FlatList, Image, Text, ScrollView, Picker } from 'react-native';
import { Input } from './common';

class Container extends Component {
	state = { searchQuery: '', cardResults: [], loading: false, page: 1, searchType: 'name' };

	searchCards() {
		this.setState({ 
			loading: true,
			cardResults: [],
			page: 1
		 });
		fetch(`http://api.magicthegathering.io/v1/cards?contains=imageUrl&${this.state.searchType}=${this.state.searchQuery}&pageSize=10&page=${this.state.page}&orderBy=name`)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({ 
				cardResults: responseJson.cards,
				loading: false
			 });
		})
		.catch((error) => {
			this.setState({ loading: false });
			console.error(error);
		});
	}

	loadMore() {
		const newPage = this.state.page + 1;
		this.setState({ 
			page: newPage,
			loading: true
		 });
		fetch(`http://api.magicthegathering.io/v1/cards?contains=imageUrl&${this.state.searchType}=${this.state.searchQuery}&pageSize=10&page=${this.state.page}&orderBy=name`)
		.then((response) => response.json())
		.then((responseJson) => {
			const allResults = this.state.cardResults.concat(responseJson.cards);
			this.setState({ 
				cardResults: allResults,
				loading: false
			 });
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
				</View>
			);
		} else if (this.state.cardResults.length > 0) {
			return this.state.cardResults.map((card) => {
				return (
					<View key={card.id} style={cardResult}>
						<Image 
							source={{uri: `${card.imageUrl}`}} 
							style={{width: 110, height: 150, margin: 10}}
						/>
						<View style={cardDetailsStyle}>
							<Text>{card.name}</Text>
							<Text>{card.type} | {card.rarity}</Text>
						</View>
					</View>
				)
			})
		} else {
			<Text>No Results!</Text>
		}
	}

	renderLoadMoreButton() {
		const { buttonStyle } = styles;

		if (this.state.cardResults.length > 0) {
			return (
				<Button
					style={buttonStyle}
					onPress={this.loadMore.bind(this)}
					title="Load More"
					accessibilityLabel="Load More"
				/>
			)
		}
	}


	render() {
		const { containerViewStyle, inputStyle, buttonStyle, contentContainer, searchSubContent, pickerStyle } = styles;
		
		return (
			<View style={containerViewStyle}>
				<View style={containerViewStyle, {height: 100}}>
					<Input
						style={inputStyle}
						secureTextEntry={false}
						autoCorrect={false}
						placeholder="Search"
						label="Search"
						value={this.state.searchQuery}
						onChangeText={searchQuery => this.setState({ searchQuery })}
					/>
					<View style={searchSubContent}>
						<Picker
							style={pickerStyle}
							selectedValue={this.state.searchType}
							onValueChange={(itemValue) => this.setState({searchType: itemValue})}>
							<Picker.Item label="Name" value="name" />
							<Picker.Item label="Converted Mana Cost" value="cmc" />
							<Picker.Item label="Color" value="colors" />
							<Picker.Item label="Type" value="type" />
							<Picker.Item label="Rarity" value="rarity" />
							<Picker.Item label="Set" value="setName" />
							<Picker.Item label="Flavor Text" value="flavor" />
							<Picker.Item label="Text" value="text" />
							<Picker.Item label="Power" value="power" />
							<Picker.Item label="Toughness" value="toughness" />
						</Picker>
						<Button
							style={buttonStyle}
							onPress={this.searchCards.bind(this)}
							title="Search"
							accessibilityLabel="Search"
						/>
					</View>
				</View>
				<ScrollView contentContainerStyle={contentContainer} style={{width: "100%"}}>
					{this.renderCardsList()}
				</ScrollView>
				{this.renderLoadMoreButton()}
			</View>
		);
	}
};

const styles = {
	containerViewStyle: {
		flex: 1,
		flexDirection: "column",
		alignSelf: "stretch",		
		margin: 5,
	},
	inputStyle: {
		flex: 1,
		width: '70%',
	},
	buttonStyle: {
		flex: 1,
	},
	pickerStyle: {
		width: 300,
		height: 40,
	},
	searchSubContent: {
		flex: 1,
		flexDirection: "row",
		height: 10,
		alignItems: "flex-start",
		// justifyContent: "center"
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