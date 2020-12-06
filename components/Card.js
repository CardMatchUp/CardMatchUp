import React from 'react';
import { StyleSheet,View, TouchableHighlight, Image } from 'react-native';

export default class Card extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		var color = 'https://reactnative.dev/img/tiny_logo.png';
		
		if(this.props.is_open){
			color = this.props.name;
		}
		
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={this.props.clickCard} activeOpacity={0.75}>					
					<Image style={styles.imageStyle} source={{uri: color}}/>
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
	imageStyle:{
		width:50,
		height:50,
	},
});