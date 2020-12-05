import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Score extends React.Component {
	
	render() {
		return (
			<View style={styles.container}>
					<Text style={styles.inf}>Her dogru eslesme +10 puan kazandırır!</Text>
					<Text style={styles.inf}> Her yanlis eslesme -1 puandir.</Text>
					<Text style={styles.score}>Skor: {this.props.score}</Text>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
		paddingBottom: 50,
		paddingTop:4,
	},
	score: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingTop:10,
		paddingBottom:3
	},

	inf:{
		fontSize:15,
		fontWeight:'bold',
		color:'#660033'
	},
});