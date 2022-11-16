import React, { useState, useRef, useCallback, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Alert, Pressable, Modal,TouchableOpacity} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { RadioButton } from 'react-native-paper';

import ConnectDisconnect from "./Components/ConnectDisconnect";
import Control from "./Components/Control";
import { displayTime } from "./Components/Util";
import Result from "./Components/Result";
import Paho from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';


client = new Paho.Client(
    "broker.hivemq.com",
    Number(8000),
    `mqtt-async-test-7417410605`
);


export default function Connect(props) {

    const [value, setvalue] = useState("");
    const [Ecg, setEgc] = useState(false);
    const [pulseseoxi, setpulseoxi] = useState(false);
    const [receivedata, setreceivedata] = useState(false);
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [senddata, setsenddata] = useState(false);

    const [results, setResults] = useState([]);
    const [dataarray, setdatarray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = React.useState('Mode1');
    const [heartrate,setheartrate] = useState(false);
    const [hrapv,setheapv]  = useState("Click To Predict")

    const timer = useRef(null);
    const datatimer = useRef(null);

    const topic1 = '/IOT/connect';
    const topic2 = '/IOT/sensor1-data';
    const topic3 = '/IOT/disconnect';
    const topic4 = '/IOT/pulse-oximeter';

    const topic5 = '/IOT/start';
    const topic6 = '/IOT/request-predict-hr'
    const topic7 = '/IOT/predict-hr'
    const topic8 = '/IOT/heart-rate'
    const topic9="/IOT/ecg-data"

    function savepulsedata(data,message) {

        const url = "https://iot-endsem.herokuapp.com/api/post-notification"
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",

            },
            body: JSON.stringify({

                "data": data,
                "message": message

            })
        }).then((response) => response.json())
            .then((result) => {
                if (result) {
                    console.log(result.message);
                }

            }).catch((err) => {
                console.log(err);
            })




    }









    async function onMessage(message) {
        if (message.destinationName === topic2) {
            setEgc(true);

            const data = message.payloadString.split(" ");

            await setdatarray(old => [...old, data]);
            console.log(dataarray)





        }
        if (message.destinationName === topic2) {
            setpulseoxi(true);

            const data = message.payloadString;








        }
        if (message.destinationName === topic3) {
            if (message.payloadString === "Disconnect") {
                setEgc(false);
                setreceivedata(false);
                setpulseoxi(false);
                console.log("Connection disconnected")

            }


        }


        if (message.destinationName === topic4) {

            await savepulsedata(data,"Pulse Oximeter Reading ");
            await Alert.alert('Alert from Devices');
            setModalVisible(true);


        }
        if (message.destinationName === topic8) {

            await savepulsedata(data,"Heart Rate Reading");
            await Alert.alert('Alert from Devices');
            setModalVisible(true);


        }

        if(message.destinationName === topic7){
            setheapv(message.payloadString)
        }
        if(message.destinationName === topic9){
            data =JSON.parse(message.payloadString)
            await savevalues(data)
        }


    }



    function changevalue(c) {
        const message = new Paho.Message("request");
        message.destinationName = topic1
        c.send(message);
        setreceivedata(true);
        console.log("message sent");

    }

    function disconnectEcg(c) {
        const message = new Paho.Message("disconnect");
        message.destinationName = topic3
        c.send(message);

        console.log("Disconnect message sent");

    }

    function startsystem() {
        const message = new Paho.Message("start");
        message.destinationName = topic5
        client.send(message);

        console.log("Start the service");

    }
    function stopsystem() {
        const message = new Paho.Message("stop");
        message.destinationName = topic5
        client.send(message);

        console.log("Stop the service");

    }



    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log("Connected To Mqtt");
                client.subscribe(topic1);
                client.subscribe(topic2);
                client.subscribe(topic3);
                client.subscribe(topic4);
                client.subscribe(topic5);
                client.subscribe(topic6);
                client.subscribe(topic7);
                client.subscribe(topic8);
                client.subscribe(topic9)
                
                client.onMessageArrived = onMessage
            },
            onFailure: () => {
                console.log("Failed to connect");
            }
        })

    }, [])



    async function savevalues(ecgdata) {

        console.log("data value", ecgdata)
        const url = "https://iot-endsem.herokuapp.com/api/post-report"
        const data = await AsyncStorage.getItem('values')
        const jsonValue = data != null ? JSON.parse(data) : null;
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",

            },
            body: JSON.stringify({

                "data": ecgdata,
                "userid":jsonValue.user._id,
                "spo2":"91 98",
                "hr":"78 120 "

            })
        }).then((response) => response.json())
            .then((result) => {
                if (result) {
                    console.log(result.message);
                    setsenddata([]);
                }

            }).catch((err) => {
                console.log(err);
            })




    }

    const handleLeftButtonPress=()=>{
        console.log("999")
    }




    

    const handleRightButtonPress = ()=>{
        if(!isRunning){
            startsystem()

        }else{
            stopsystem()
        }
        setRunning((previousState) => !previousState);
        
    }
    

    const connecttoMqtt = () => {

        changevalue(client);

    }





    const disconnectMqtt = () => {
        disconnectEcg(client);
    }

    const logout = () => {




    }

    const predicthra = async()=>{
        setheartrate(true);
        setheapv("Predicting...")
        const data = await AsyncStorage.getItem('values')
        const jsonValue = data != null ? JSON.parse(data) : null;
        const inputdata = jsonValue.user.personalinfo.age+" "+jsonValue.user.personalinfo.sex+" "+jsonValue.user.personalinfo.cp+" "+jsonValue.user.personalinfo.trtbs+" "+jsonValue.user.personalinfo.chol+" "+jsonValue.user.personalinfo.fbs+" "+jsonValue.user.personalinfo.rest_ecg+" "+jsonValue.user.personalinfo.thelach+" "+jsonValue.user.personalinfo.exang+" "+jsonValue.user.personalinfo.oldpeak+" "+jsonValue.user.personalinfo.slp+" "+jsonValue.user.personalinfo.ca+" "+jsonValue.user.personalinfo.thall
        const message = new Paho.Message(inputdata);
        message.destinationName = topic6
        client.send(message);

        

    }


    const Mode1=(
        <>
                    <Text style={styles.textsec}>Arrythmia Detection</Text>
            <View style={styles.heightSelection}>
                <Text style={styles.label}>Connected</Text>

                <Text style={styles.value}>

                    <Text style={styles.unit}> Receiving Data -  </Text>
                    <Text style={styles.unit}>{displayTime(time)}</Text>

                </Text>

                <View>



                    <View style={styles.control}>
                        <Control
                            isRunning={isRunning}
                            handleLeftButtonPress={handleLeftButtonPress}
                            handleRightButtonPress={handleRightButtonPress}
                        />
                    </View>



                </View>

            </View>
        </>
    )

    const Mode2=(
        <>
           <Text style={styles.textsec}>Heart Attack Rate Prediction</Text>
            <View style={styles.heightSelection}>
                <Text style={styles.label}>Connected</Text>

                <Text style={styles.value}>

                    <Text style={styles.unit}> Your Heart Status - {hrapv} </Text>
                    <Text style={styles.unit}></Text>

                </Text>

                <View>



                    <View style={styles.control}>
                    <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor:"green"},
        ]}

        onPress={predicthra}
        
      >
        <View style={styles.controlButton}>
          <Text style={{ color:"white"}}>
           Predict
          </Text>
        </View>
      </TouchableOpacity>
                    </View>



                </View>

            </View>
        </>
    )

    const Mode3=(
        <>
                            <Text style={styles.textsec}>Cardiac Stress Testing</Text>
            <View style={styles.heightSelection}>
                <Text style={styles.label}>Connected</Text>

                <Text style={styles.value}>

                    <Text style={styles.unit}> Receiving Data -  </Text>
                    <Text style={styles.unit}></Text>

                </Text>

                <View>



                    <View style={styles.control}>
                    <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor:"green"},
        ]}
        
      >
        <View style={styles.controlButton}>
          <Text style={{ color:"white"}}>
           Do Test
          </Text>
        </View>
      </TouchableOpacity>

                    </View>



                </View>

            </View>
        </>
    )


    return (
        <SafeAreaView style={styles.container}>

            <StatusBar style="light" />
            <Modal
                animationType="slide"

                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Alert has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle1}>Alert</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>




                </View>
            </Modal>


            <View style={styles.header}>
                <Text style={styles.headerText}>AUTOMATED TREAD MILL TEST</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.genderSelection}>

                    <ConnectDisconnect
                        label="Connect"
                        iconName="link"
                        iconColor="green"
                        functionname={connecttoMqtt}

                    />
                    <ConnectDisconnect
                        label="Disconnect"
                        iconName="power-off"
                        iconColor="red"
                        functionname={disconnectMqtt}
                    />
                    <ConnectDisconnect
                        label="Log-Out"
                        iconName="sign-out-alt"
                        iconColor="cyan"
                        functionname={logout}
                    />
                </View>
                <View style={styles.radiocontainer}>

                 <View style={styles.radiobutton}>
                 <RadioButton
                    
                    
                    value="Mode1"

                    status={checked === 'Mode1' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Mode1')}
                />
                <Text style={styles.radiobuttoncolor}>Arrythmia Detection</Text>


                 </View>

                 <View style={styles.radiobutton}>

                 <RadioButton
                    value="Mode2"
                    status={checked === 'Mode2' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Mode2')}
                />
                                <Text style={styles.radiobuttoncolor}>Heart Attack Rate Prediction</Text>



                 </View>

                 <View style={styles.radiobutton}>

                 <RadioButton
                    value="Mode3"
                    status={checked === 'Mode3' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Mode3')}
                />
                <Text style={styles.radiobuttoncolor}>Cardiac Stress Testing</Text>


                 </View>
                
               
               
            </View>
{checked =="Mode1" ? Mode1: ((checked == "Mode2") ? Mode2:Mode3)}




            <Text style={styles.textsec}>ECG Sensor</Text>
            <View style={styles.heightSelection}>
                {Ecg ? <Text style={styles.label}>Connected</Text> : <Text style={styles.label1}>Disconnected</Text>}





            </View>
            <Text style={styles.textsec}>Pulse Oximeter Sensor</Text>
            <View style={styles.heightSelection}>
                {pulseseoxi ? <Text style={styles.label}>Connected</Text> : <Text style={styles.label1}>Disconnected</Text>}





            </View>
        </View>

         


        </SafeAreaView >
    )
}

const CENTER = {
    justifyContent: "center",
    alignItems: "center",
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d2236",
        paddingTop: Constants.statusBarHeight,
    },
    result: { flex: 3 / 5 },
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    header: {

        justifyContent: "center",
        alignItems: "center",
        height: 70,
        borderBottomWidth: 5,
        borderBottomColor: "#16192e",
    },

    headerTitle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
    },
    headerTitle1: {
        fontWeight: "bold",
        fontSize: 24,
        color: "Black",
    },
    headerText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
    },

    genderSelection: {

        flex: 3 / 3,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    weightAndAgeSelection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: -10,
    },
    textsec: {
        color: "white",
        fontSize: 16,
        marginLeft: 12,
        marginTop: 10
    },
    heightSelection: {

        backgroundColor: "#323344",
        padding: 15,
        borderRadius: 10,

    },
    label: {
        fontSize: 15,
        color: "green",
    },
    label1: {
        fontSize: 15,
        color: "red",
    },
    value: {
        color: "#fff",
        textAlign: "center",
        fontSize: 35,
        lineHeight: 55,
        fontWeight: "bold",
    },
    unit: {
        fontSize: 16,

    },

    displayText: {
        color: "white",
        fontSize: 20,
        alignItems: "center",


    },
    control: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    radiocontainer: {
        
        margin: 15,
        backgroundColor: "#323344",
        height: 120,
        paddingTop: 10,
        paddingLeft: 10
    },
    radiobutton: {
        flexDirection: "row",
    },
    radiobuttoncolor:{
        color:"white",
        marginTop:8
      
    
    },
    controlButtonBorder: {
        ...CENTER,
        width: 70,
        height: 70,
        borderRadius: 70,
      },
      controlButton: {
        ...CENTER,
        width: 65,
        height: 65,
        borderRadius: 65,
        borderColor: "white",
        borderWidth: 1,
      }

});
