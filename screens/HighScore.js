import React from 'react';
import firebase from '../Firebase';
import Leaderboard from 'react-native-leaderboard';
import { Alert } from 'react-native';

export default class HighScore extends React.Component { //App
  constructor(){
    super();
  }
  state = {
    data: [
        {userName: 'Joe', highScore: 52},
        {userName: 'Jenny', highScore: 120},
        //...
    ] //can also be an object of objects!: data: {a:{}, b:{}}
}
alert = (title, body) => {
  Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
    cancelable: false
  });
};
  render(){
    return (
        <Leaderboard 
        onRowPress={(item, index) => {
          this.alert(item.name + " clicked", item.score + " points, wow!")}}
        data={this.state.data} 
        sortBy='highScore' 
        labelBy='userName'/>
        )
  }
}