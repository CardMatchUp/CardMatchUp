import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Score extends React.Component {
	
	render() {
		return (
			<View style={styles.container}>
				<View style = {styles.infView}>  
					<Text style={styles.inf}>Her dogru eslesme +10 puan kazandırır!</Text>
					<Text style={styles.inf}> Her yanlis eslesme -1 puandir.</Text>
				</View>


				<View>
					<Text style={styles.score}>Skor: {this.props.score}</Text>
				</View>
				
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		//paddingBottom: 70,
		paddingTop:1,
		marginBottom:90
		
	},
	score: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingTop:10
	},
	inf:{
		fontSize:15,
	},

	infView:{
		flex: 1,
		alignItems: 'center',
		paddingBottom: 35,

	},

});