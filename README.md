
# Automated Tread Mill Testing (TMT) With Heart Monitoring system

## Step 1- Hardware Configuration



### Circuit-Diagram Connection-between-Arduino-and-ECG-Sensor-AD8232



![App Screenshot](https://lh3.googleusercontent.com/d/1TDYcpBO16RU70gety0QCFG6PpG554bM5)

The AD8232 ecg sensor comes with 9 pins on the IC, 
onnect five of the nine pins on the board to Arduino. 
Those five pins are labelled GND, 3.3v, OUTPUT, LO-, and LO+.

    • We are connecting GND of sensor with GND of Arduino.
    • 3.3v of sensor with 3.3v of Arduino
    • OUTPUT pin of sensor to A0 pin of Arduino
    • LO- pin of sensor to 11 pin of Arduino
    • LO+ pin of sensor to 10 pin of Arduino

No external libraries are required to run ecg code.

After making the circuit run the code in Arduino IDE, ECG will start to send data.

### Interfacing-MAX30100-Pulse-Oximeter-Sensor-with-Arduino 


![App Screenshot](https://lh3.googleusercontent.com/d/1Vz0DYJQ1Vb_gGxgQjH87HGW29EyfdNhp)

Your Arduino must have the following libraries installed to run the code

    • spo2_algorithm.h
    • Wire.h
    • Servo.h
    • MAX30105.h

The max30100 sensor comes with seven pins on the IC, We are connecting four of the seven pins on the board to Arduino. Those five pins are labelled GND, VIN, SCL and SDA.

    • We are connecting GND of sensor with GND of Arduino.
    • VIN of sensor with 5v of Arduino
    • SCL pin of sensor to A4 pin of Arduino
    • SDA pin of sensor to A5 pin of Arduino

After making the circuit run the code in Arduino IDE, MAX30100 will start to send data. 

### Circuit Diagram Connection between Arduino and Servo Motor


![App Screenshot](https://lh3.googleusercontent.com/d/11m5oUxx9EhtZR5wXf8NJLhpPIX_mqrqr)

The Servo motor comes with three pins.
Connect all the three pins to Arduino as specified below:


    • We are connecting GND of motor with GND of Arduino.
    • VIN of motor with 5v of Arduino
    • OUTPUT pin of motor to 9 pin of Arduino

After making the circuit run the code in Arduino IDE and  motor will start rotaing. 
Code of servo motor is written inside the code of MAX30100.


Before running the python file you have to set the port in the file. By doing this data will be transffered from serial baud to python file.


## Step 2- Set Up the ML model

### Model 1 - Heart Attack Risk Prediction

Your system must have the following dependencies to run this Heart_Attack_Prediction.py file.

	pip install pandas
	pip install numpy
	pip install matplotlib
	pip install seaborn as sns
	pip install dill
	pip install sklearn


Import Dataset using below link:
	https://www.kaggle.com/datasets/rashikrahmanpritom/heart-attack-analysis-prediction-dataset/code

Run Heart_Attack_Prediction.py file to get "prediction.pkl" will get created.


### Model 2 - Arrhythemia Class Predeiction


Your system must have following dependencies to train the Model, run following command in terminal to install

    pip install os-sys
	pip install pickle5
	pip install python-csv
	pip install PyWavelets
	pip install scipy
	pip install scikit-learn
	pip install keras
	pip install tensorflow


For training we used MIT-BIH Arrythemia Database available at physionet
	https://physionet.org/content/mitdb/1.0.0/

Run "Arrhythemia_Class_Classification.py" to train the model and get "model_1_arry.pkl" file.


# Step 3 - Set Up The HeartCare App
## Android/IOS APP

Your System must have the following dependencies to run the HeartCare App:-

1-npm

2-Node.js

Installtion Steps

    sudo apt update
    sudo apt install nodejs

3- Expo CLI

Installtion Step

    npm install -g expo-cli

You can check all the dependencies by run following command in terminal

    npm -v
    node -v
    expo -V


Open App folder given in Zipped file.    
App folder contains of frontend and backend folder

To run backend part of the HeartCare App login to MongoDB Atlas and make one cluster.
After making the cluster you will get a link to connect.
Update this link in the .env file so that all the data will be stored there.

Steps to run Back end part of the HeartCare App

    set your terminal with backend folder path
    npm install
    npm start

Server will start on localhost:4000  

In this project I have hosted the backend part on Heroku. So no need to worry about backend part you can run only front end part.

Backend Link  
    https://iot-endsem.herokuapp.com/api

To run frontend of this ehe HeartCare App your system should have an android emulator or you can run the HeartCare App in your phone by installing Expo Go App.

Update the backend link to http://{Your IP Address}:4000 if you are running backend on your system.


Steps to run Front end part of the HeartCare App

    set your terminal with backend folder path
    npm install
    npm start



## Screenshots Of Our App

**Login Screen**

![App Screenshot](https://lh3.googleusercontent.com/d/1giJCxDEUWWGzzacHc-eAw8ws0JEqQpYr)


**Home Screen**


![App Screenshot](https://lh3.googleusercontent.com//d/1FETkPJXyysy6UTN9-u5Rn966mFwUHM4U)

**Report Screen**

![App Screenshot](https://lh3.googleusercontent.com/d/10_tNhyMR33WlamAcIwXpxdASZECbANTB)



## API Reference

#### Login

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required**|


#### Logout

```http
  GET /api/logout
```

#### Get User Information

```http
  GET /api/me
```
#### GET Notification

```http
  GET /api/notification
```

#### Post Notification
API to post notifications 

```http
  POST /api/post-notification
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `string` | **Required**. Set alert to particular user |
| `message`      | `string` | **Required** Send the alert message|
| `data`      | `string` | **Required**. Value of Pulse Oximeter and Heart rate |


#### Post Report

API to generate reports

```http
  POST /api/post-report

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`      | `string` | **Required** set userid to paricular report |
| `data`      | `string` | **Required**. ECG data|
| `SPO2`      | `string` | **Required**. SPO2 range values|
| `Heart rate`      | `string` | **Required**. heart rate range values|

#### GET Report

```http
  GET /api/reports
```






