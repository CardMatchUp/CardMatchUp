import React from 'react';
import { StyleSheet, View, Button, Image, Text } from 'react-native';

import Score from '../components/Score';
import Card from '../components/Card';



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
    this.CardGetir = this.CardGetir.bind(this);
    this.sifirla = this.sifirla.bind(this);


    let cards = [
      {
        name: '#0099cc',
      },
      {
        name: '#66ffcc',
      },
      {
        name: '#ffff99',
      },
      {
        name: '#ff9900',
      },
      {
        name: '#990000',
      },
      {
        name: '#993366',
      },
      {
        name: '#660066',
      },
      {
        name: '#9900ff',
      },
      {
        name: '#666699',
      },
      {
        name: '#660066',
      },
      {
        name: '#d6d6c2',
      },
      {
        name: '#3333ff',
      },
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
      secimler: [],
      ciftler: [],
      score: 0,
      cards: this.cards
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
				  <Text style={styles.header_text}>CardMatchGame</Text>
		  	</View>
        <View style={styles.body}>
          { 
            this.renderRows.call(this) 
          }
          
        </View>
        <Score score={this.state.score} />
        <Button
          onPress={this.sifirla}
          title="Sifirla"
          color= 'gray'
        />
        
      </View>
      
    );
  }


  sifirla() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      secimler: [],
      ciftler: [],
      cards: cards,
      score: 0
    });
  }


  renderRows() {
   
    var cardd = this.satirCard(this.state.cards);
    return cardd.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.CardGetir(cards) }
        </View>
      );
    });
   
  }

  satirCard(cards) {
    let satircard = [];
    let cardlar = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      cardlar.push(item);
      if(count == 4){
        satircard.push(cardlar)
        count = 0;
        cardlar = [];
      }
    });
    return satircard;
  }


  CardGetir(cards) {
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
    var ciftler = this.state.ciftler;
    var secimler = this.state.secimler;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;
    
    if(cards[index].is_open == false && ciftler.indexOf(cards[index].name) === -1){

      cards[index].is_open = true;
      
      secimler.push({ 
        index: index,
        name: cards[index].name
      });

      if(secimler.length == 2){
        if(secimler[0].name == secimler[1].name){
          score += 10;
          ciftler.push(cards[index].name);
        }else{

          score -=1;
         
          cards[secimler[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        secimler = [];
      }

      this.setState({
        score: score,
        cards: cards,
        secimler: secimler
      });

    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'pink'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal:20,
    
  },
  header: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 30,
		paddingBottom: 5,
	},

	header_text: {
		fontWeight: 'bold',
		fontSize: 23,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
	}
});