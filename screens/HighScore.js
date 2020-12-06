import React from 'react';
import firebase from '../Firebase';
import Leaderboard from 'react-native-leaderboard';
import { Alert, View,Text, Image } from 'react-native';
const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
export default class HighScore extends React.Component { //App
  constructor(){
    super();
  }
  state = {
    data: [] ,
    userRank: 1,

  
}
alert = (title, body) => {
  Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
    cancelable: false
  });
};
sort = (data) => {
  console.log("DATAAAAAAAA",data)
  const sorted = data && data.sort((item1, item2) => {
      return item2.highScore - item1.highScore;
  })
  let userRank = sorted.findIndex((item) => {
      return item.userName === this.state.myUserName;
  })
  this.setState({ userRank: ++userRank });
  return sorted;
}
componentDidMount(){

  const user = firebase.auth().currentUser;
console.log("AUTH",user.uid)

firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
.get()
.then(querySnapshot => {
this.setState({
  myUserName:querySnapshot.data().name,
  myLastScore:querySnapshot.data().lastscore
})
});


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
    this.sort(this.state.data)

  });
}

renderHeader() {
  return (
      <View colors={[, '#1da2c6', '#1695b7']}
          style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: 'white', }}>Leaderboard</Text>
          <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              marginBottom: 15, marginTop: 20
          }}>
              <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                  {ordinal_suffix_of(this.state.userRank)}
              </Text>
              <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                  source={{ uri: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' }} />
              <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                  {this.state.myLastScore}pts
              </Text>
          </View>
          {/* <ButtonGroup
              onPress={(x) => { this.setState({ filter: x }) }}
              selectedIndex={this.state.filter}
              buttons={['Global', 'Friends']}
              containerStyle={{ height: 30 }} /> */}
      </View>
  )
}



  render(){
    return (
      
<View style={{ flex: 1 }}>
        {/* Ghetto Header */}

      {this.renderHeader()}
        <Leaderboard 
        onRowPress={(item, index) => {
          this.alert(item.name + " clicked", item.score + " points, wow!")}}
        data={this.state.data} 
        sortBy='highScore' 
        evenRowColor= "#edfcf9"
        labelBy='userName'/>      
        
        </View>

        
        )
  }
}