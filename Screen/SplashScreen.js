import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
        navigation.reset({
            index: 0,
            routes: [{name: 'MomoLogin'}],
          })
    }, 2000)
  })

  return (
   
          <View
    style= {styles.container}
    >
    <Text style={styles.textcolor}>Team Protocols presents</Text>
    <Text style={styles.textcolor2}>AUTOMATED TREAD MILL TEST (TMT) </Text>
    <Text style={styles.textcolor2}>WITH HEART MONITORING SYSTEM </Text>

  </View>
   
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d2236',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      textcolor:{
        color:"white",
        fontSize:26,
        paddingBottom:30,
        
      },
      textcolor2:{
        color:"cyan",
        fontSize:18,
        
    
      }
})