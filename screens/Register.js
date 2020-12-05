import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Register extends React.Component { //App
  state={
    name:"",
    email:"",
    password:""
  }
  render(){
    return (
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

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
  registerText:{
    color:"white"
  }
});