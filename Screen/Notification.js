import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
  } from "react-native";

  import { FontAwesome5 } from "@expo/vector-icons";

  import { PLAY_LIST } from "./Components/listSong";

  import { styles } from "./Components/notifiactionstyles";

  export default function ReportPage(){

    const[loader,setloader] = useState(true);
    const[data,setdata] = useState([]);

    

    useEffect(()=>{
      const url = "" //Enter Your Backend URL
  
      fetch(url, {
        method: "get",
        
       
      }).then((response)=> response.json())
      .then((result)=>{
        setdata(result.notification);
          setloader(false);
            
  
        
      })
      .catch((err)=>{
        console.log(err);
      })
  
      },[]);

      let showdata
      showdata = (
        <>
        
        </>

      )
    const renderHeader = () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      );

      const renderItem = ({ item, index }) => (
        <TouchableOpacity
          style={styles.listItem}
        >
          <FontAwesome5 name="exclamation-triangle" size={40} color="red" />

    
          <View style={{ flex: 1 }}>
            <Text style={styles.songName}>{item.datetime.slice(0,10)}</Text>
    
            <View style={styles.songInfo}>
            <Text style={styles.singerName}>{item.message}</Text>

              <Text style={styles.songDuration}>{item.data}</Text>

            </View>
       
          </View>
         
        
        </TouchableOpacity>
      );
      const keyExtractor = (item) => item.sourceUri;

    return(
    <SafeAreaView style={styles.container}>
      {loader?
      <>
      <Text>Loading...</Text>
      </>
      :
      <>
      <FlatList
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
      </>
      
      }
    
    </SafeAreaView>

)

  }