import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Header } from './src/components/common';
import { Container } from './src/components/Container';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="MTG Card Viewer" />
        <Container />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',    
  },
});
