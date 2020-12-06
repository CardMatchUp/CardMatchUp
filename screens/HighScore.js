import React from 'react';
import firebase from '../Firebase';
import Leaderboard from 'react-native-leaderboard';
import { Alert } from 'react-native';

export default class HighScore extends React.Component { //App
  constructor(){
    super();
  }
  state = {
    data: [] 
}
alert = (title, body) => {
  Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
    cancelable: false
  });
};

componentDidMount(){
  firebase.firestore()
  .collection('Users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        this.setState({
          
          data:[
            ...this.state.data,
            {
          userName:doc.data().name,
          highScore:doc.data().lastscore}
          ]

        })

      }
    });
  });

}

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