import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Pressable
} from "react-native";
import { LineChart, Grid } from 'react-native-svg-charts'
import { FontAwesome5 } from "@expo/vector-icons";

import { PLAY_LIST } from "./Components/listSong";

import { styles } from "./Components/MusicPlayer.style";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
export default function ReportPage(props) {
  const [loader, setloader] = useState(true);
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reload,setreload] = useState(false);

  console.log(reload)

  useEffect(() => {
    const url = "" //Enter Your Backend URL

    fetch(url, {
      method: "get",


    }).then((response) => response.json())
      .then((result) => {
        setdata(result.reports);
        setloader(false);




      })
      .catch((err) => {
        console.log(err);
      })

  }, [reload])
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Daily Reports</Text>
      <Text onPress={()=>setreload(!reload)} style={styles.headerTitle2}>Reload</Text>
    </View>
  );
  const linedata = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={()=>{
        props.navigation.navigate('Graphreport', {
          itemId: 86,
          otherParam: item,
        });
        
      }}
    >
      <View style={styles.coverImage}>
        <FontAwesome5 name="chart-line" size={40} color="cyan" />


      </View>


      <View style={{ flex: 1 }}>
        <Text style={styles.songName}>{item.datetime.slice(0, 10)}</Text>

        <View style={styles.songInfo}>
          <Text style={styles.singerName}>Click to see your report</Text>
          <Text style={styles.songDuration}></Text>
        </View>

      </View>
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="download" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="share" size={20} color="cyan" />
      </TouchableOpacity>

    </TouchableOpacity>
  );
  const keyExtractor = (item) => item.sourceUri;

  const chartdata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"

        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Reprt has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle1}>Report</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>

          <LineChart
                style={{ height: 200 }}
                data={linedata}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
            
         
        </View>
      </Modal>
      {loader ?
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