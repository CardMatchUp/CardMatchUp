import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

export default class Card extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		var color = 'white';
		
		if(this.props.is_open){
			color = this.props.name;
		}
		
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={this.props.clickCard} activeOpacity={0.75}>					
					<View style = {{backgroundColor: color, height:50,width:50,borderWidth:1}}/>
				</TouchableHighlight>		
			</View>
		);
	}

}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	},
});