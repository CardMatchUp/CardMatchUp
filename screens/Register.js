import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";



export default class Register extends React.Component { //App

  constructor(){
    super();
  }

  state={
    name:"",
    email:"",
    password:""
  }


  Register = (email, password) => {
    try {
      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then(data => {
           ()=>showMessage({
          message: "Başarılı",
          description: "Kayıt Yapılıyor.",
          type: "success",
        }),

        firebase
  .firestore()
  .collection("Users")
  .doc(data.user.uid)
  .set({
    name: this.state.name,
    lastscore:0,
  })
  .then((ref) => {  });
        this.props.navigation.navigate('Oyun',data.user.uid)
        
      }
         ).catch(error=>{
          showMessage({
            message: "Uyarı",
            description: "Girdiğiniz Bİlgiler Hatalı.",
            type: "info",
          });
         });


        
} catch (error) {
      //console.log(error.toString(error));
      
    }
  };



  render(){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <Text style={styles.logo}>CardMatchUp</Text>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter Name" 
            placeholderTextColor="white"
            onChangeText={text => this.setState({name:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter Email" 
            placeholderTextColor="white"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Password" 
            placeholderTextColor="white"
            onChangeText={text => this.setState({password:text})}/>
        </View>

        <TouchableOpacity onPress={() => this.Register(this.state.email, this.state.password)} style={styles.registerBtn}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>


        <View style={{flexDirection:'row',alignItems:'space-around',marginTop:10}}>
          <Text style={{color:'white'}}>Already have an account?   </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{color:'#fb5b5a',fontWeight:'bold',fontSize:15}}>Login here</Text>
          </TouchableOpacity>


        </View>

        



        <FlashMessage position="bottom" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A344E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:60,
    color:"#fb5b5a",
    marginBottom:110,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 10},
    textShadowRadius: 10
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  registerBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50,
    marginBottom:10
  },
  registerText:{
    color:"white"
  },






});