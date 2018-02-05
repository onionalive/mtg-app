import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, Image, Text, ScrollView, Picker } from 'react-native';
import { Input, Button } from './common';

class Container extends Component {
	state = { searchQuery: '', cardResults: [], loading: false, page: 1, searchType: 'name', cardsPerPage: 10 };

	init() {
		this.setState({ 
			loading: true,
			cardResults: [],
			page: 1
		 });
	}

	searchCards() {
		fetch(`http://api.magicthegathering.io/v1/cards?contains=imageUrl&${this.state.searchType}=${this.state.searchQuery}&pageSize=${this.state.cardsPerPage}&page=${this.state.page}&orderBy=name`)
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

	newSearch() {
		this.init();
		this.searchCards();
	}

	loadNext() {
		const newPage = this.state.page + 1;
		this.setState({ page: newPage });
		if (this.state.cardResults.length >= (this.state.page * this.state.cardsPerPage)) {
			this.searchCards();
		}
	}

	loadPrev() {
		if (this.state.page > 1) {
			const newPage = this.state.page - 1;
			this.setState({ page: newPage });
		}
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
			const start = (this.state.page - 1) * this.state.cardsPerPage;
			const end = start + this.state.cardsPerPage;
			const cardsToRender = this.state.cardResults.slice(start, end);
			return cardsToRender.map((card) => {
				return (
					<View key={card.id} style={cardResult}>
						<Image 
							source={{uri: `${card.imageUrl}`}} 
							style={{width: 110, height: 150, margin: 10}}
						/>
						<View style={cardDetailsStyle}>
							<Text style={{ paddingBottom: 5 }}>{card.name}</Text>
							<Text style={{ paddingBottom: 5 }}>{card.type} | {card.rarity}</Text>
							<Text style={{ paddingBottom: 5 }}>{card.text}</Text>
						</View>
					</View>
				)
			})
		} else if (this.state.searchQuery != '' && this.state.cardResults == 0) {
			return (
				<Text>No Results!</Text>				
			)
		}
	}

	renderPaginateButtons() {
		if (this.state.cardResults.length > 0 && this.state.page == 1) {
			return (
				<Button
					onPress={this.loadNext.bind(this)}
					children="Next"
				/>
			)
		} 
		
		if (this.state.cardResults.length > 0 && this.state.page >= 1) {
			return (
				<View style={{ flex: 1, flexDirection: "row" }} >
					<Button
						onPress={this.loadPrev.bind(this)}
						children="Prev"
					/>
					<Button
						onPress={this.loadNext.bind(this)}
						children="Next"
					/>
				</View>
			)
		}
	}


	render() {
		const { containerViewStyle, inputStyle, contentContainer, searchSubContent, pickerStyle } = styles;
		
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
							onPress={this.newSearch.bind(this)}
							children="Search"
						/>
					</View>
				</View>
				<ScrollView contentContainerStyle={contentContainer} style={{width: "100%"}}>
					{this.renderCardsList()}
					{this.renderPaginateButtons()}
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
		margin: 5,
	},
	inputStyle: {
		flex: 1,
		width: '70%',
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
	},
	cardResult: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		height: 300,
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