import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../firebase'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";


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
         .then(showMessage({
          message: "Başarılı",
          description: "Giriş Yapılıyor.",
          type: "success",
        })
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
        <Text style={styles.logo}>CardMatchUp</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity >
          <Text  style={styles.forgot}>Şifremi Unuttum?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.Login(this.state.email, this.state.password)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <FlashMessage position="bottom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
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
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});