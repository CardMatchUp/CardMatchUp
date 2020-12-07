import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import iid from '@react-native-firebase/iid';


export default class Login extends React.Component { //App
  constructor(){
    super();
  }
  state={
    email:"",
    password:""
  }
  
  Login = (email, password) => {

    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(data=>{
          showMessage({
          message: "Başarılı",
          description: "Giriş Yapılıyor.",
          type: "success",
        }),

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
            placeholder="Enter Your Email..." 
            placeholderTextColor="white"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Your Password..." 
            placeholderTextColor="white" //#003f5c
            onChangeText={text => this.setState({password:text})}/>
        </View>

        <TouchableOpacity onPress={() => this.Login(this.state.email, this.state.password)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SignUpBtn}  onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.loginText}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.RankingBtn} onPress={() => this.props.navigation.navigate('HighScore')}>
          <Text style={{color:'black',fontWeight:'bold',}} >
            Score Ranking
          </Text>
        </TouchableOpacity>

        <FlashMessage position="bottom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#003f5c',
    backgroundColor: '#1A344E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:60,
    color:"#fb5b5a",
    marginBottom:70,
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
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:70,
    marginBottom:10,
    
  },
  loginText:{
    color:"white",
  },
  SignUpBtn:{
    width:"80%",
    backgroundColor:"#669999",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:3
  },

  RankingBtn:{
    width:"50%",
    backgroundColor:"#0EADF3",
    borderRadius:22,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:65

  }
});