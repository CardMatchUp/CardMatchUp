import React from 'react';
import { StyleSheet, View, Button, Image, Text, StatusBar, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import firebase from '../Firebase';

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if(i == 0) return this;
  while(--i){
   j = Math.floor(Math.random() * (i + 1));
   temp = this[i];
   this[i] = this[j];
   this[j] = temp;
  }
  return this;
}


export default class Oyun extends React.Component {

  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this);
    this.reset = this.reset.bind(this);


    let cards = [
      {
        name: 'https://i.hizliresim.com/xDFWpt.png',
      },
      {
        name: 'https://i.hizliresim.com/Mxd69A.png',
      },
      {
        name: 'https://i.hizliresim.com/dhbnvL.png',
      },
      {
        name: 'https://i.hizliresim.com/3g9IJY.png',
      },
      {
        name: 'https://i.hizliresim.com/TLhPQI.png',
      },
      {
        name: 'https://i.hizliresim.com/kag6Af.png',
      },
      {
        name: 'https://i.hizliresim.com/WoeIvy.png',
      },
      {
        name: 'https://i.hizliresim.com/3i8roY.png',
      }
    ];

    var clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      var id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle(); 
    this.state = {
      selected: [],
      matched: [],
      score: 0,
      cards: this.cards,
      userName:"",
      lastScore:-1
    }
  }

componentDidMount(){
  //this.props.navigation.navigate('HighScore');
  try {
    if(this.props.navigation.state.params){
      firebase.firestore().collection("Users").doc(this.props.navigation.state.params)
      .get()
    .then(querySnapshot => {
      this.setState({
        userName:querySnapshot.data().name,
        lastScore:querySnapshot.data().lastscore
      })
    });
    }
  } catch (error) {
    
  }


}

IsGameEnd= (score) => {
  try {
    if(this.props.navigation.state.params){
      firebase.firestore().collection('Users').doc(this.props.navigation.state.params)
      .update({
        lastscore:score
       })
       this.componentDidMount();
    }
  } catch (error) {
    
  }

 
}


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <View style={styles.header}>
				  <Text style={styles.header_text}>CardMatchUp</Text>
		  	</View>
        <View style={styles.body}>
          { 
            this.getRows.call(this) 
          }
        </View>

        <View style={styles.maxScView}>
            <Text style={styles.maxSc}>{this.state.userName} Max Score: {this.state.lastScore}</Text>
          </View>

        <View style={styles.xxx}>
          <Text style={styles.inf}>Her dogru eslesme +10 puan kazandırır!</Text>
          <Text style={styles.inf}> Her yanlis eslesme -1 puandir.</Text>
          <Text style={styles.score}>Score: {this.state.score}</Text>
        </View>
        <View style={styles.buttons}>
        

        <TouchableOpacity style={styles.RankingBtn} onPress={() => this.props.navigation.navigate('HighScore')}>
          <Text style={{color:'white',fontWeight:'bold',}} >
            Score Ranking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.RankingBtn} onPress={this.reset}>
          <Text style={{color:'white',fontWeight:'bold',}} >
            Reset
          </Text>
        </TouchableOpacity>

        </View>
       
        
      </View>
      
    );
  }


  reset() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      selected: [],
      matched: [],
      cards: cards,
      score: 0
    });
  }


  getRows() {
    var cardd = this.rowCard(this.state.cards);
    return cardd.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.getCard(cards) }
        </View>
      );
    });
   
  }

  rowCard(cards) {
    var rowCard = [];
    var cardlar = [];
    var count = 0;
    cards.forEach((x) => {
      count += 1;
      cardlar.push(x);
      if(count == 4){
        rowCard.push(cardlar)
        count = 0;
        cardlar = [];
      }
    });
    return rowCard;
  }


  getCard(cards) {
    return cards.map((card, index) => {
      return (
        <Card 
          key={index} 
          name={card.name} 
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)} 
        />
      );
    });
  }


  clickCard(id) {
    var matched = this.state.matched;
    var selected = this.state.selected;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;
    
    if(cards[index].is_open == false && matched.indexOf(cards[index].name) === -1){

      cards[index].is_open = true;
      
      selected.push({ 
        index: index,
        name: cards[index].name
      });

      if(selected.length == 2){
        if(selected[0].name == selected[1].name){
          score += 10;
          matched.push(cards[index].name);

          //matched.length == 12? (this.IsGameEnd(score)):("");
          
          if (matched.length === 8) {
            if (score > this.state.lastScore) {
              (this.IsGameEnd(score))
            }
            else
              (this.IsGameEnd(this.state.lastScore))
          }
          


        }else{

          score -=1;
         
          cards[selected[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        selected = [];
      }

      this.setState({
        score: score,
        cards: cards,
        selected: selected
      });

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2C5782'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal:20,
    
    
  },
  header: {
		flex: 1,
		flexDirection: 'column',
		paddingBottom: 25,
	},

	header_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
		fontSize: 33,
    textAlign: 'center',
    color:'#fb5b5a',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 10},
    textShadowRadius: 10
  },
  
  maxSc:{
    fontWeight: 'bold',
    fontStyle: 'italic',
		fontSize: 23,
    textAlign: 'center',
    color:'#fb5b5a',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 10},
    textShadowRadius: 10
  },


  maxScView:{
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
		paddingBottom: 25,
  },


  xxx: {
		flex: 2,
		alignItems: 'center',
		paddingBottom: 6,
		paddingTop:4,
	},
	score: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingTop:10,
		paddingBottom:2
	},

	inf:{
		fontSize:15,
		fontWeight:'bold',
		color:'#fb5b5a'
  },
  
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:65,
    paddingBottom:5
  },
  RankingBtn:{
    width:"40%",
    backgroundColor:"#1A344E",
    borderRadius:22,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    
  }
});
