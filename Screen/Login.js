import React,{useState} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";




import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MomoLogin(props) {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");

  const [loggedin,setloggedin] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('values')
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue);
    } catch(e) {
      // error reading value
    }
  }

  

  const login =()=>{
    const url = "https://iot-endsem.herokuapp.com/api/login"

    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        
        "email":email,
        "password":password,
                    
      })
    }).then((response)=> response.json())
    .then((result)=>{
      if(result){
        console.log(result.user)
        const jsonobject = JSON.stringify({
          id:result.user._id,
          token:result.token,
          user:result.user
        })
        AsyncStorage.setItem('values', jsonobject);
        console.log("loggedin");
        getData();
        props.navigation.navigate("HomeScreen")

      }else{
        console.log(result.message);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  console.log(email,password);
  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.content}>
        <View style={styles.textcontent}>
        
    <Text style={styles.textcolor}>Team Protocols </Text>
    <Text style={styles.textcolor2}>Login To connect with Application </Text>
    </View>
        

        <View style={styles.form}>

          <TextInput
            style={styles.inputemail}
            value={email}
            onChangeText={setemail}
            autoFocus={true}
            placeholder="Enter Email Id"
            placeholderTextColor="#929292"
          />

          <TextInput
            style={styles.inputPassword}
            onChangeText={setpassword}
            value={password}
            secureTextEntry={true}
            autoFocus={true}
            placeholder="Enter Password"
            placeholderTextColor="#929292"
          />

          <TouchableOpacity style={styles.buttonLogin} onPress={login}>
            <Text  style={styles.buttonLoginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <TouchableOpacity>
            <Text style={styles.userText}>Register Here</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.userText2} numberOfLines={1} adjustsFontSizeToFit>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const TEXT = {
  color: "#fff",
  textAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2236",
    
   
    alignItems: 'center',
    justifyContent:'center'
   

  },
  content: {
    paddingHorizontal: 30,
    
  },
  textcontent:{
    alignItems: 'center',
    justifyContent:'center'

  },
  textWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  hiText: {
    ...TEXT,
    fontSize: 20,
    lineHeight: 50,
    fontWeight: "bold",
  },
  userText: {
    color: "cyan",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 30,
  },
  userText2: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 30,
  },
  form: {
    marginTop:60,
    marginBottom: 30,
  },
  iconLock: {
    color: "#929292",
    position: "absolute",
    fontSize: 16,
    top: 16,
    left: 22,
    zIndex: 10,
  },
  inputPassword: {
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 18,
    color: "#929292",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
   
  },
  inputemail: {
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 20,
    color: "#929292",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom:10
    
  },
  buttonLogin: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "cyan",
    justifyContent: "center",
    marginTop: 50,

  },
  buttonLoginText: {
    color: "#fff",
    textAlign: "center",
    fontSize:18
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textcolor:{
    color:"white",
    fontSize:26,
    paddingBottom:21,
    
  },
  textcolor2:{
    color:"cyan",
    fontSize:18,
    

  }
});
