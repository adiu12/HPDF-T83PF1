/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import { AppRegistry } from 'react-native';
import {TabNavigator,StackNavigator,DrawerNavigator} from 'react-navigation';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,TextInput,
  View,Button,TouchableOpacity,Alert
} from 'react-native';

 

export default class search extends Component<{}> {
constructor(props) {
    super(props);
    this.state = { 
textInputValue1: '',
type:'',
 val:'',
 myobj1:'',
 myobj2:''

 };
  }
	
	
  render() {
	  
    return (
      <View style={styles.container}>
	  
      
 
<View style={{ backgroundColor:'white',height:40}}>
 <TextInput 
    underlineColorAndroid='transparent'
 onChangeText={(textInputValue1)=>{ this.setState({textInputValue1})}}/>
</View>
<TouchableOpacity
 onPress={()=>{
 this.setState({
	 type:'EntityType:',
	 val:'EntityValue:'
 })
	 const formdata = new FormData();
     var value= this.state.textInputValue1;	 
	 formdata.append("input",value);
	 fetch('https://app.fridge28.hasura-app.io/',{ method:'POST',headers:{
		'Accept':'application/json',
    'Content-Type':'multipart/form-data'},body:
	formdata 
  })

      

  
      .then((response)=>response.json())
	  .then((responsejson)=>{
		/*  try{
			let resp=JSON.parse(responsejson);
		 if(value=='')
           throw new Error(resp.error);
		  }
             catch(e){
				 Alert.alert('type');
			 }
          */ 		 
      this.setState({		  
	   myobj1:JSON.stringify(responsejson[0].entityType).replace('"','').replace('"',''),
	  myobj2:JSON.stringify(responsejson[0].entityValue).replace('"','').replace('"','')
	  });    
     
	  })
	  .catch((error)=>{
		  
     Alert.alert( 'Please enter the recognized entities'  );
	 
	 
      });

  }}
  >
  <Text style={{color: 'orange',fontSize:15}} > Click here </Text>
</TouchableOpacity>
	<Text></Text>
    <Text></Text>	
<Text style={{ fontWeight:'bold',fontSize:20,color:'purple'}}>{this.state.type} {this.state.myobj1}   </Text>
<Text style={{ fontWeight:'bold',fontSize:20,color:'purple'}}>{this.state.val} {this.state.myobj2}   </Text>
		
		 
			 
  
       </View>          	  
       
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
    backgroundColor: 'lightgrey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});
//AppRegistry.registerComponent('search', () => search);