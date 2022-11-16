import React, { useCallback, useEffect, useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';



import Graphreport from './Screen/Graphreport';
import AppNavigator from './Screen/Appnavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
 
 


  return (
  
 
  <AppNavigator />


 
  
  );
}

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
});
