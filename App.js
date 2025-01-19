// import { StatusBar } from 'expo-status-bar';
// import {} from 'expo';
{/* <StatusBar style="dark" /> */}
import React, { Component, useState, useEffect, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppRegistry, Platform, Text, View, StyleSheet, Image, FlatList, SectionList, TextInput, Modal, ImageBackground, TouchableOpacity, TouchableHighlight, Alert, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { BlurView } from 'expo-blur';
import { ProgressBar, ActivityIndicator, MD3Colors, MD2DarkTheme, MD2Colors } from 'react-native-paper';

import * as SplashScreen from 'expo-splash-screen';

  ////////////////////////
 ///  npx expo start  ///
////////////////////////





let deviceHeight = Dimensions.get('window').height;
let deviceHeightPart = deviceHeight/24;
let deviceWidth = Dimensions.get('window').width;
let ff = "Avenir";
let color = "#16182d";
let settingsBackgroundColor = color;
let sectionBackgroundColor = '#252944';
let littleSection = '#3b3e5d';
let editOrNotColor = littleSection;
let lighterRed = '#c44141';

let taskbarHeight = deviceHeightPart*1.5;
let iconWidth = taskbarHeight;
let iconBackgroundWidth = iconWidth*1.2;
let iconBackgroundHeight = taskbarHeight*1.2;
// let iconColor = '#47e7a9';
// let iconColor = '#1421a6';
let iconColor = '#2d3269';
let colorOfText = '#fdfeff';
let colorOfTitleText = '#ffffff';

let numberInputBoxBgColor = "#282d40";
let numberInputTextColor = "#a4abbc";

let splashed = false;
let vered = false;

let indexM = '';

let slicedRatingsTotals = [];
let FWT = [];
let names = [];
let ratingsLoaded = false;

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (splashed == false){
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await SplashScreen.hideAsync();
        splashed = true;
      }
      if (vered == false){
        console.log('VERSION 0.4.1');
        console.log();
        console.log('- Fixed ranked page not appearing');
        console.log('- ');
        console.log();
        vered = true;
        console.log('Simulating menuValue change');
        await valueMenuValueChange('myColleges');
        await valueMenuValueChange('settings');
        await valueMenuValueChange('home');
        console.log('Simulated menuValue change');
        await SplashScreen.hideAsync();
      }
    }



    prepare();
  }, []);

  // useEffect(() => {
  //   async function doFuncThing() {
  //     if (appIsReady) {
  //       await SplashScreen.hideAsync();
  //       // console.log('splash screen hidden');
  //     }
  //   }
  //   doFuncThing();
  // }, [appIsReady]);



  // if (!appIsReady) {
  //   return null;
  // }





  // const [valueT, setValueT] = useState([{label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()}])
  // const [valueT, setValueT] = useState(JSON.parse(AsyncStorage.getItem('valueT')))

  // const [valueT, setValueT] = useState(JSON.stringify([{label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()}]))
  const [valueT, setValueT] = useState([{label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()}])

//   const [semiOldVal, setSemiOldVal] = useState('select')
  const [oldVal, setOldVal] = useState('select');
//   const [ratingsListMyCol, setRatingsListMyCol] = useState()
  const [ratingsTotals, setRatingsTotals] = useState([]);

  const [ORT, setORT] = useState([{name: 'N/A', value: 0}]);

  const [firstTime, setFirstTime] = useState('true');

  const [deleteConfirmVis, setDeleteConfirmVis] = useState(false);

  const [genNotes, setGenNotes] = useState(' ');

  const [editted, setEditted] = useState(false);

  const [indexOfRemoval, setIndexOfRemoval] = useState(0);

 
  useEffect(() => {
    async function initUser() {
      // await AsyncStorage.setItem('firstTime', 'true');
      // await new Promise(resolve => setTimeout(resolve, 200));
      async function firstUser(isFirstTime){
        // console.log('isinfirstuserfunc') // Testing log
        if (!(isFirstTime=='false')){
          setFirstTime('true');
          // console.log('firstTime - ' + firstTime); //Removed to reduce log spam
          await AsyncStorage.setItem('firstTime', 'false');
          
          await AsyncStorage.setItem('weights', JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0]));
          await AsyncStorage.setItem('ratingKeyselect', JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0]));
          await AsyncStorage.setItem('collegeList', JSON.stringify([{label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()}]));
          await AsyncStorage.setItem('valueT', JSON.stringify([{label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()}]));
          // await AsyncStorage.setItem(rKey); // Not implemented at all // Doesn't need to be implemented?
  
          setFirstTime('false')
  
        }
        else{
            setFirstTime('false');
        }
      }
      let isFirstTime = await AsyncStorage.getItem('firstTime');
      // console.log(isFirstTime)
      await (firstUser(isFirstTime))
    }
    initUser();

    }, [] )




  let blankRating = [0, 0, 0, 0, 0, 0, 0, 0]
  const [ratingsL, setRatingsL] = useState(blankRating)

  const delay = (ms) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  let getRatings = (ratingKey) => {
    updateRatingsL(ratingKey)
  };

  // let reloadRatings = async () => {
  //   setRatingsTotals([])
  //   for (let i = 1; i < valueT.length; i = i + 1){
  //     let rKey = valueT[i].ratingKey
  //     console.log('-----rKey-----')
  //     console.log('rKey - ')
  //     console.log(rKey)
  //     console.log('-----rKey-----')
  //     getRating(rKey)
  //   }
  //   console.log()
  //   console.log()
  //   console.log('RR_ratingsTotals - ')
  //   console.log(ratingsTotals)
  //   console.log()
  //   console.log()
  // };

  let getRating = async (ratingKey) => {
    // console.log()
    let rKey = ratingKey
    // console.log('-----rKey-----')
    // console.log('rKey - ')
    // console.log(rKey)
    // console.log('-----rKey-----')
    let jsonValue = await AsyncStorage.getItem(rKey);
    let parsedJSONValue = JSON.parse(jsonValue);
    // console.log('GR_parsedJSONValue - ')
    // console.log(parsedJSONValue)
    let ratings = parsedJSONValue
    let total = 0
    for (let i = 0; i < ratings.length; i = i + 1){
      total = total + ((ratings[i])*(weights[i]/10))
    }
    ratingsTotals.push(total);
    slicedRatingsTotals = ratingsTotals.slice(-valueT.length + 1, ratingsTotals.length);
    // console.log();
    // console.log('slicedRatingsTotals - ');
    // console.log(slicedRatingsTotals);
    // console.log();
    // console.log();
    // console.log('GR_ratingsTotals - ');
    // console.log(ratingsTotals);
    // console.log();
    setRatingsTotals(slicedRatingsTotals);
  };

  // useEffect(() => {
  //   // console.log()
  //   // console.log('UE_3_ratingsTotals - ')
  //   // console.log(ratingsTotals) // Removed to reduce log spam
  //   // console.log()
  //   if (colleges.length==0){
  //       setColleges({label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()})
  //   }
  //   else{
  //       // console.log()
  //       // console.log('UE_3_colleges - ')
  //       // console.log(colleges)
  //       // console.log()
  //   }
  // }, [ratingsTotals])

  const updateRatingsL = async (key) => {
    try {
      console.log('URL_key - ')
      console.log(key)
      const jsonValue = await AsyncStorage.getItem(key);
      console.log('URL_jsonvalue - ')
      console.log(jsonValue)
      let value = JSON.parse(jsonValue);
      console.log('URL_value - ')
      console.log(value)
      // if (value!=null){
        setRatingsL(value)
        console.log()
        console.log()
        console.log('URL_ratingsL - ')
        console.log(ratingsL)
        console.log(value)
        console.log()
        console.log()
        return value
      // }
    } catch (e) {
      console.log(e)
    }
  };

  const addRating = async (key, valueE) => {
    try {
      const jsonValue = JSON.stringify(valueE);
      console.log('jsonvalue - ')
      console.log(jsonValue)
      await AsyncStorage.setItem(key, jsonValue).then(console.log('inFunc => itemSet'));
    } catch (e) {
      console.log(e)
    }
  };

  const recreateFactors = (name, index) => {
    let placeholderFactors = factors;
    placeholderFactors[index].name = name;
    setFactors(placeholderFactors);
  };

  const recreateFactorNames = (name, index) => {
    let placeholderFactorNames = factorNames;
    placeholderFactorNames[index] = name;
    setFactorNames(placeholderFactorNames);
  };

  let initColleges = [
    {label: 'Select a College', value: 'select', ratingKey: 'ratingKeyselect', key: uuid.v4()},
    {label: 'UW - Madison', value: 'madison', ratingKey: 'ratingKeymadison', key: uuid.v4()},
    {label: 'UW - La Crosse', value: 'laCrosse', ratingKey: 'ratingKeylaCrosse', key: uuid.v4()},
    {label: 'UW - Stevens Point', value: 'stevensPoint', ratingKey: 'ratingKeystevensPoint', key: uuid.v4()},
    {label: 'NTC', value: 'ntc', ratingKey: 'ratingKeyntc', key: uuid.v4()},
  ];
  

  
  
  let initFactors = [
    {name: 'Size of College', value: 'f1', key: uuid.v4()},
    {name: 'Location of College', value: 'f2', key: uuid.v4()},
    {name: 'Programs', value: 'f3', key: uuid.v4()},
    {name: 'Housing', value: 'f4', key: uuid.v4()},
    {name: 'Student Life', value: 'f5', key: uuid.v4()},
    {name: 'Prestige', value: 'f6', key: uuid.v4()},
    {name: 'Cost', value: 'f7', key: uuid.v4()},
    {name: 'Research', value: 'f8', key: uuid.v4()},
  ];
  
  const storeDataJSON = async (key, valueE) => {
    try {
      const jsonValue = JSON.stringify(valueE);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e)
    }
  };
  
  const updateColleges = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('collegeList');
      const pasredJSONValue = JSON.parse(jsonValue);
      if (pasredJSONValue!=null){
        setValueT(pasredJSONValue)
      }
    } catch (e) {
      console.log('updateCollegesError - ')
      console.log(e)
    }
  };
  


  // useEffect(() => { // We'll see if this is needed
  //   // setViewedWeights()
  //   updateColleges()
  // }, [valueT]);

  const [factors, setFactors] = useState(initFactors)
  const [colleges, setColleges] = useState(valueT)
  const [deleteMenuVis, setDeleteMenuVis] = useState(false)
  const [factorNames, setFactorNames] = useState(factors.names)

  let removeValueCollage = (index) => {
    let newArr = valueT
    newArr.splice(index + 1, 1)
    storeDataJSON('collegeList', newArr)
    updateColleges('collegeList')
  };

  let addCollege = async (nameI, valueI) => {
    let newList = valueT.concat({label: nameI, value: valueI, ratingKey: 'ratingKey'+valueI, key: uuid.v4()})
    addRating('ratingKey' + valueI, [0, 0, 0, 0, 0, 0, 0, 0])
    setValueT(newList)
    await storeDataJSON('collegeList', newList)
    await updateColleges('collegeList')
  };

  let formatCollegeName = (name) => {
    name = name + ' '
    let formattedName = ''
    let lastIndex = 0
    name = name.replaceAll('-', '')
    while (name.toLowerCase().indexOf(' ')!=-1){
      formattedName = formattedName + name.substring(lastIndex, name.toLowerCase().indexOf(' '))
      lastIndex = name.toLowerCase().indexOf(' ')
      name = name.replace(' ', '')
    }
    formattedName = formattedName.replace(formattedName.substring(0,1), formattedName.substring(0,1).toLowerCase())
    return formattedName
  };

  let addCollegeSumbitButton = async () => {
    let valueR = formatCollegeName(text)
    if (valueR == 'select'){
      Alert.alert('Invalid College Name');
      return
    }
    else if (valueR == ""){
      return
    }
    else if (valueT.findIndex(e => e.value == valueR) != -1){
      Alert.alert('College Already Exists');
      setText('');
      return
    }
    await addCollege(text, valueR);
    setText('');
    // Alert.alert('College Successfully Added');
    // setModalVisible(!modalVisible);



    // await updateColleges('collegeList')
    // setColleges(valueT)
    // // onCollegesValueChange(valueR);
    // onCollegesValueChange('select');
    // valueMenuValueChange('home');
    // // // console.log("\n\n\n\n\n\n\ntext: "+text+"\nvalueR:"+valueR+"\n"+colleges+"\n"+colleges[colleges.length - 1]+"\n\n\n\n\n")
    // // // console.log(str(colleges))
    // // // console.log(valueR)
    // // // new Promise(resolve => setTimeout(resolve, 1000)).then(setValue(valueR))
    // console.log('promise started');
    // await new Promise(resolve => setTimeout(resolve, 2000))//.then(setValue(valueR)).then(console.log('PROMISE RESOLVED'))
    // console.log('PROMISE RESOLVED');
    // console.log(valueR);
    // console.log(colleges);
    // setValue(valueR);
    Alert.alert('College Successfully Added');
    setModalVisible(!modalVisible);
  };

  let addCollegeModal = () => {
    setModalVisible(true)
  };

  let removalTriggered = (index) => {
    setDeleteConfirmVis(true);
    setIndexOfRemoval(index)
  };
  



  let setNewWeights = async () => {
    let arrNew = [valueS1, valueS2, valueS3, valueS4, valueS5, valueS6, valueS7, valueS8]
    try {
      const jsonValue = JSON.stringify(arrNew)
      await AsyncStorage.setItem('weights', jsonValue).then(Alert.alert('Settings Successfully Saved'))
      editOrNotColor = littleSection;
    } catch (e) {
      console.log(e)
    }
  };

  let setNewRatings = async () => {
    let arrRNew = [valueM1, valueM2, valueM3, valueM4, valueM5, valueM6, valueM7, valueM8]
    try {
      let rjsonValue = JSON.stringify(arrRNew)
      console.log('rjsonValue - ' + rjsonValue)
      console.log(value)
      await AsyncStorage.setItem('ratingKey' + value, rjsonValue)
      await AsyncStorage.setItem('genNotes' + value, genNotes).then(Alert.alert('Ratings Successfully Saved'))
      editOrNotColor = littleSection;
    } catch (e) {
      console.log(e)
    }
  };

  let setViewedWeights = () => {
    updateWeights().then(() => {
      // console.log('\n\n\nUPDATING SETTINGS WEIGHTS\n\n\n')
      setValueS1(weights[0])
      setValueS2(weights[1])
      setValueS3(weights[2])
      setValueS4(weights[3])
      setValueS5(weights[4])
      setValueS6(weights[5])
      setValueS7(weights[6])
      setValueS8(weights[7])
      // console.log('SETTINGS WEIGHTS UPDATED\n\n\n')
    })
    // console.log('weights - ')
    // console.log(weights)
  };
////
////
////
  const updateWeights = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weights');
      const value = JSON.parse(jsonValue);
      if (value!=null){
        // console.log('value - ')
        // console.log(value)
        
        setWeights(value)
        // return value
      }
    } catch (e) {
      console.log('updateWeightsError - ')
      console.log(e)
    }
  };


  // const roundNumber = (num) => Math.round(num/100) *100

  let onCollegesValueChange = async (valueIn) => {

    // console.log('OCVC_valueIn - ')

    setValueMenu('home')
    
    let newArray = [valueM1, valueM2, valueM3, valueM4, valueM5, valueM6, valueM7, valueM8]
    console.log()
    console.log()
    console.log('newArray - ')
    console.log(newArray)
    console.log()
    console.log()
    console.log(valueT)
    // let oldRVal = valueT[valueT.findIndex(e => e.value == oldVal)]
    // console.log(oldRVal)
    // let oldRKey = oldRVal.ratingKey
    let rVal = valueT[valueT.findIndex(e => e.value == value)]
    console.log(rVal)
    let rKey = rVal.ratingKey

    let jsonValue = await AsyncStorage.getItem(rKey);
    console.log('URL_jsonvalue - ')
    console.log(jsonValue)
    let parsedJSONValue = JSON.parse(jsonValue);

    setValueM1(parsedJSONValue[0])
    setValueM2(parsedJSONValue[1])
    setValueM3(parsedJSONValue[2])
    setValueM4(parsedJSONValue[3])
    setValueM5(parsedJSONValue[4])
    setValueM6(parsedJSONValue[5])
    setValueM7(parsedJSONValue[6])
    setValueM8(parsedJSONValue[7])
    console.log('MANUAL OUTPUTING Ms')
    console.log([valueM1, valueM2, valueM3, valueM4, valueM5, valueM6, valueM7, valueM8])

    console.log(rVal)
    console.log(rVal.value)
    let holdingNotes = await AsyncStorage.getItem('genNotes' + rVal.value)
    setGenNotes(holdingNotes);
    editOrNotColor = littleSection;
    

    // addRating(rKey, newArray)

  }

  let max = (num) => {
    let len = num.length;
    let mx = {name: 'N/A', value: -1};
    for (let i = 0; i < len; i = i + 1){
      if (num[i].value > mx.value){
        mx = num[i]
      }
    }
    return mx
  }

  let min = (num) => {
    let len = num.length;
    let mn = {name: 'N/A', value: 1000000};
    for (let i = 0; i < len; i = i + 1){
      if (num[i].value < mn.value){
        mn = num[i]
      }
    }
    return mn
  }

  let valueMenuValueChange = async (value) => {
    if (value == 'myColleges'){
      ratingsLoaded = false;
      setLoadModalOpen(true);
      for (let i = 1; i < valueT.length; i = i + 1){
        getRating(valueT[i].ratingKey)
      }
      editOrNotColor = littleSection;
      await new Promise(resolve => setTimeout(resolve, 1000));
      let dummyWT = [];
      let len = slicedRatingsTotals.length;
      for (let i = 0; i < len; i = i + 1){
        dummyWT.push({name: valueT[i + 1].label, value: slicedRatingsTotals[i]});
        names.push({name: valueT[i + 1].label});
      }
      let dummyT = dummyWT;
      let dummyTLen = dummyT.length;
      let newRT = [];
      for (i = 0; i < dummyTLen; i = i + 1){
        newRT.push(max(dummyT));
        dummyT.splice(dummyT.indexOf(max(dummyT)), 1);
      }
      FWT = newRT;
      console.log("FWR GENERATED");
      setLoadModalOpen(true);
      delay(100).then(() => {setLoadModalOpen(false);});
      ratingsLoaded = true;
    }
    else if (value == 'settings'){
      setViewedWeights()
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("WEIGHTING COMPLETE");
    }
    else if (value == 'home'){
      await updateColleges('collegeList')
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("COLLEGE LIST UPDATED");
    }
  }


  setOpenMenuToggle = () => {
    setOpenMenu(true)
    setValue('select')
    setOpen(false)
    // setViewedWeights()
  };

  let homeWhite = require('./assets/img/homeIconV2White.png');
  let collegeWhite = require('./assets/img/collegeIconWhite.png');
  let settingsWhite = require('./assets/img/settingsGearWheelWhite.png');
  let hamburgerIcon = require('./assets/img/hamburgerMenuIconV2.png');
  // let hamburgerIcon = require('./assets/img/hamburgerMenuIconWhite.png');
  // let plusIcon = require('./assets/img/plusIcon.png');
  let plusIcon = require('./assets/img/plusIconDark.png');
  // let plusIcon = require('./assets/img/plusIconWhite.png');
  let deleteMenuIcon = require('./assets/img/deleteMenu.png')
  let reloadIcon = require('./assets/img/refresh.png')


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  setOpenBypass = () => {
    if (valueMenu=='home'){
      if (open==true){
        setOpen(false)
      }
      else{
        setOpen(true)
      }
    }
    else{
      setValueMenu('home')
      setOpen(true)
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('select')

  let setOpenUpdate = () => {
    
    if (open==false){
      setOpen(true)
      updateColleges('collegeList')
      setColleges(valueT)
    }
    else{
      setOpen(false)
    }
  };

  let listOneThruTen = [{label: '0', value: 0},{label: '1', value: 1},{label: '2', value: 2},{label: '3', value: 3},{label: '4', value: 4},{label: '5', value: 5},{label: '6', value: 6},{label: '7', value: 7},{label: '8', value: 8},{label: '9', value: 9},{label: '10', value: 10}];

  const [openMenu, setOpenMenu] = useState(false);
  const [valueMenu, setValueMenu] = useState('home')
  const [itemsMenu, setItemsMenu] = useState([
    {label: 'Home', value: 'home', icon: () => <Image source={homeWhite} style={{height: 25, width: 25}} />},
    {label: 'My Colleges', value: 'myColleges', icon: () => <Image source={collegeWhite} style={{height: 25, width: 25}} />},
    {label: 'Settings', value: 'settings', icon: () => <Image source={settingsWhite} style={{height: 25, width: 25}} />},
    // {label: 'Dev Menu', value: 'devMenu', icon: () => <Image source={settingsWhite} style={{height: 25, width: 25}} />},
    
  ]);

  const [loadModalOpen, setLoadModalOpen] = useState(false);
  
  const [openS1, setOpenS1] = useState(false);
  const [valueS1, setValueS1] = useState(0)
  const [itemsS1, setItemsS1] = useState(listOneThruTen);

  const [openS2, setOpenS2] = useState(false);
  const [valueS2, setValueS2] = useState(0)
  const [itemsS2, setItemsS2] = useState(listOneThruTen);

  const [openS3, setOpenS3] = useState(false);
  const [valueS3, setValueS3] = useState(0)
  const [itemsS3, setItemsS3] = useState(listOneThruTen);
  
  const [openS4, setOpenS4] = useState(false);
  const [valueS4, setValueS4] = useState(0)
  const [itemsS4, setItemsS4] = useState(listOneThruTen);
  
  const [openS5, setOpenS5] = useState(false);
  const [valueS5, setValueS5] = useState(0)
  const [itemsS5, setItemsS5] = useState(listOneThruTen);
  
  const [openS6, setOpenS6] = useState(false);
  const [valueS6, setValueS6] = useState(0)
  const [itemsS6, setItemsS6] = useState(listOneThruTen);
  
  const [openS7, setOpenS7] = useState(false);
  const [valueS7, setValueS7] = useState(0)
  const [itemsS7, setItemsS7] = useState(listOneThruTen);
  
  const [openS8, setOpenS8] = useState(false);
  const [valueS8, setValueS8] = useState(0)
  const [itemsS8, setItemsS8] = useState(listOneThruTen);

  const [S1Focus, setS1Focus] = useState(false);
  const [S2Focus, setS2Focus] = useState(false);
  const [S3Focus, setS3Focus] = useState(false);
  const [S4Focus, setS4Focus] = useState(false);
  const [S5Focus, setS5Focus] = useState(false);
  const [S6Focus, setS6Focus] = useState(false);
  const [S7Focus, setS7Focus] = useState(false);
  const [S8Focus, setS8Focus] = useState(false);
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [openM1, setOpenM1] = useState(false);
  const [valueM1, setValueM1] = useState(0)
  const [itemsM1, setItemsM1] = useState(listOneThruTen);
  
  const [openM2, setOpenM2] = useState(false);
  const [valueM2, setValueM2] = useState(0)
  const [itemsM2, setItemsM2] = useState(listOneThruTen);
  
  const [openM3, setOpenM3] = useState(false);
  const [valueM3, setValueM3] = useState(0)
  const [itemsM3, setItemsM3] = useState(listOneThruTen);
  
  const [openM4, setOpenM4] = useState(false);
  const [valueM4, setValueM4] = useState(0)
  const [itemsM4, setItemsM4] = useState(listOneThruTen);
  
  const [openM5, setOpenM5] = useState(false);
  const [valueM5, setValueM5] = useState(0)
  const [itemsM5, setItemsM5] = useState(listOneThruTen);
  
  const [openM6, setOpenM6] = useState(false);
  const [valueM6, setValueM6] = useState(0)
  const [itemsM6, setItemsM6] = useState(listOneThruTen);
  
  const [openM7, setOpenM7] = useState(false);
  const [valueM7, setValueM7] = useState(0)
  const [itemsM7, setItemsM7] = useState(listOneThruTen);
  
  const [openM8, setOpenM8] = useState(false);
  const [valueM8, setValueM8] = useState(0)
  const [itemsM8, setItemsM8] = useState(listOneThruTen);

  const [M1Focus, setM1Focus] = useState(false);
  const [M2Focus, setM2Focus] = useState(false);
  const [M3Focus, setM3Focus] = useState(false);
  const [M4Focus, setM4Focus] = useState(false);
  const [M5Focus, setM5Focus] = useState(false);
  const [M6Focus, setM6Focus] = useState(false);
  const [M7Focus, setM7Focus] = useState(false);
  const [M8Focus, setM8Focus] = useState(false);
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [modalVisible, setModalVisible] = useState(false);
  const [weights, setWeights] = useState([valueS1, valueS2, valueS3, valueS4, valueS5, valueS6, valueS7, valueS8])
  const [text, setText] = useState();

  // let ratings = [
  //   // [{rating: valueS1}, {rating: valueS2}, {rating: valueS3}, {rating: valueS4}, {rating: valueS5}, {rating: valueS6}, {rating: valueS7}, {rating: valueS8}],
  //   // [{}]
  // ]; //REUSE DROPDOWNS, JUST SAVE IT AND READ IT WHEN DISPLAYING





  return (
    <SafeAreaProvider>
      <View style={styles.container}>{firstTime=='false' ? (<>
        <View style={{backgroundColor: color, position:'absolute', top:0, left:0, width: deviceWidth, height:deviceHeightPart*1.5}}></View>
        {/*{Platform.OS === 'ios' ? (*/}<SafeAreaView>
        <View style={{overflow: Platform.OS === 'ios' ? 'hidden' : 'visible', paddingBottom: 5}}>
          <View style={styles.topMargin}>
            <Text style={{fontSize: 24, fontFamily: ff, marginBottom: 0, fontWeight: 'bold', color: colorOfText, shadowOpacity: 0.75}}>URank</Text>
          </View>
        </View>
        <View style={styles.topTaskbar}>
          <DropDownPicker
            open = {open}
            value = {value}
            items = {colleges}
            // setOpen = {setOpenBypass}
            setOpen = {setOpenUpdate}
            // setOpen = {setOpen}
            setValue = {setValue}
            setItems = {setColleges}

            onChangeValue={(changeValue) => {
              onCollegesValueChange(changeValue)
            }}

            modalProps={{presentationStyle: 'pageSheet'}}

            closeAfterSelecting = {true}
            showBadgeDot = {false}
            theme = "DARK"
            searchable = {true}
            mode = "BADGE"
            listMode = "MODAL"
            modalAnimationType="slide"

          style={{ width: deviceWidth/2, height: taskbarHeight+10, position: 'absolute', left: 0, top: Platform.OS === 'ios' ? 0:(deviceHeightPart*1.5)+34, margin: 5, marginTop: 0}}/>
          
        </View>
        <View style={{position: 'absolute', top: Platform.OS === 'ios' ? -deviceHeightPart*3:-deviceHeightPart*3 - 5, right: (2*deviceWidth/6)-7.5,}}>{valueMenu=='home' ? (<>
          <View style={{backgroundColor: iconColor, shadowOpacity: 0.25, elevation: Platform.OS === 'android' ? 10:0, borderWidth: 0, position: 'absolute', top: deviceHeightPart*5.5, right: 0, marginTop: 10, borderRadius: 150, height: taskbarHeight+10, width: iconWidth+10}}></View>
          <TouchableOpacity onPress={addCollegeModal} style={{position: 'absolute', shadowOpacity: 0.125, top: deviceHeightPart*5.5, right: 0, margin: 5, marginTop: 15, height: taskbarHeight, width: iconWidth}}>
            <Image source={plusIcon} style={{height: taskbarHeight, width: iconWidth}}/>
          </TouchableOpacity>
          <Modal
            transparent={false}
            visible={modalVisible}
            animationType='slide'
            >
              <SafeAreaView style={{backgroundColor: color}}>

              <View style={{alignItems: 'flex-end', width: deviceWidth}}>
                <TouchableOpacity style={{margin: 5}} onPress={() => {setModalVisible(!modalVisible)}}>{/*</TouchableOpacity></SafeAreaView>, Alert.alert('Modal Closed'), console.log('Modal Closed')}}>*/}
                  <View style={{height: deviceHeightPart, width: deviceHeightPart, margin: 2, borderWidth: 1, shadowOpacity: 0.25, borderRadius: 5, backgroundColor: lighterRed, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: deviceHeightPart-10, margin: 0}}>X</Text>
                  </View>
                </TouchableOpacity>
              </View>

                <View style={{width: deviceWidth-10, marginLeft: 5, backgroundColor: 'gray', borderRadius: 10}}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      height: deviceHeightPart*1.5,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: colorOfText,
                    }}
                    keyboardAppearance='dark'
                    autoCorrect = {false}
                    autoCapitalize = 'words'
                    onChangeText={setText}
                    value={text}
                    placeholder="Enter college name"
                    placeholderTextColor={colorOfText}
                    
                  />
                </View>

                <View style={{width: deviceWidth, alignItems: 'center', marginTop: 50}}>
                  <TouchableOpacity style={{margin: 5}} onPress={addCollegeSumbitButton}>{/*</TouchableOpacity></SafeAreaView>, Alert.alert('Modal Closed'), console.log('Modal Closed')}}>*/}
                    <View style={{height: deviceHeightPart, width: deviceWidth-120, margin: 0, borderWidth: 1, borderRadius: 10, backgroundColor: iconColor, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: deviceHeightPart-10, margin: 0}}>Add College</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{width: deviceWidth, height: deviceHeightPart*22.5}}></View>

              </SafeAreaView>
            </Modal>
          </>) : null}</View>
        <View style={{position: 'absolute', top: Platform.OS === 'ios' ? -deviceHeightPart*3:-deviceHeightPart*3-5, right: 10, width: deviceWidth/15, height: deviceHeightPart}}>
          <DropDownPicker
            open={openMenu}
            value={valueMenu}
            items={itemsMenu}
            setOpen={setOpenMenu}
            setValue={setValueMenu}
            setItems={setItemsMenu}

            onOpen = {() => {}}

            onChangeValue = {async (value) => {await valueMenuValueChange(value)}}
            
            closeAfterSelecting={true}
            textStyle={{fontSize: 30, color: colorOfText, shadowOpacity: 0.5}}
            theme='DARK'
            mode='BADGE'
            listMode='MODAL'
            modalAnimationType="slide"
            style={{height: 0,width: 0,opacity: 0,position: 'absolute',top: 0, left: 0}}
          />
          <View style={{backgroundColor: iconColor, shadowOpacity: 0.5, position: 'absolute', top: deviceHeightPart*5.5, right: 0, marginTop: 10, borderRadius: 7.5, height: taskbarHeight+10, width: iconWidth+10}}></View>
          <TouchableOpacity onPress={setOpenMenuToggle} style={{position: 'absolute', shadowOpacity: 0.125, top: deviceHeightPart*5.5, right: 0, margin: 5, marginTop: 15, height: taskbarHeight, width: iconWidth}}>
            <Image source={hamburgerIcon} style={{height: taskbarHeight, width: iconWidth}}/>
          </TouchableOpacity>
        
        </View>
          <View style={styles.pages}>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

          <View>{valueMenu=='devMenu' ? (<>
            <View style={{width: deviceWidth, textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: 'white', shadowOpacity: 100, margin: 15, fontSize: 24}}>Welcome to the Dev Menu</Text></View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.devMenuItem} onPress={() => {updateWeights(), console.log(weights)}}><Text style={styles.devMenuItemText}>LOG WEIGHTS</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {setViewedWeights().then(Alert.alert('Viewed Weights Set'))}} style={styles.devMenuItem}><Text style={styles.devMenuItemText}>setViewedWeights</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {storeDataJSON('collegeList', initColleges), updateColleges('collegeList'), Alert.alert('All personalized colleges cleared')}} style={styles.devMenuItem}><Text style={styles.devMenuItemText}>resetColleges</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {console.log(ratingsTotals)}} style={styles.devMenuItem}><Text style={styles.devMenuItemText}>logRankingsTotalsList</Text></TouchableOpacity>
              <TouchableOpacity onPress={async () => {await AsyncStorage.setItem('firstTime', 'true')}} style={styles.devMenuItem}><Text style={styles.devMenuItemText}>resetFirstTime</Text></TouchableOpacity>
              <TouchableOpacity onPress={async () => {await AsyncStorage.clear()}} style={styles.devMenuItem}><Text style={styles.devMenuItemText}>clearAsyncStorage</Text></TouchableOpacity>
            
            </View>
{/*<TouchableOpacity style={styles.devMenuItem}><Text style={styles.devMenuItemText}></Text></TouchableOpacity>*/}
          </>) : null}</View>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            <View style={{backgroundColor: '', marginTop: 5}}>{valueMenu=='settings' ? (<>


              <View style={{position: 'absolute', top: Platform.OS === 'ios' ? -deviceHeightPart*2.15:deviceHeightPart/2.75, left: deviceWidth/2+10, backgroundColor: iconColor, borderWidth: 0, shadowOpacity: 0.5, elevation: Platform.OS === 'ios' ? 0:1, marginTop: 0, borderRadius: 150, height: taskbarHeight+10, alignItems: 'center', justifyContent: 'center', width: iconWidth+10}}>
                <TouchableOpacity onPress={() => {setDeleteMenuVis(!deleteMenuVis)}} style={{height: taskbarHeight, width: iconWidth}}>
                  <Image source={deleteMenuIcon} style={{height: taskbarHeight, width: iconWidth}}/>
                </TouchableOpacity>
              </View>

              <Modal
                transparent={false}
                visible={deleteMenuVis}
                animationType='slide'
                style={{}}
                >
                  <SafeAreaView style={{backgroundColor: color}}>

                    <View style={{alignItems: 'flex-end', width: deviceWidth}}>
                      <TouchableOpacity style={{margin: 5}} onPress={() => {setDeleteMenuVis(!deleteMenuVis)}}>{/*</TouchableOpacity></SafeAreaView>, Alert.alert('Modal Closed'), console.log('Modal Closed')}}>*/}
                        <View style={{height: deviceHeightPart, width: deviceHeightPart, margin: 2, borderWidth: 1, shadowOpacity: 0.25, borderRadius: 5, backgroundColor: iconColor, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: deviceHeightPart-10, margin: 0}}>X</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <FlatList 
                      data={valueT.slice(1)}
                      renderItem={({ item, index }) => 
                        <View style={{backgroundColor: sectionBackgroundColor, alignItems: 'center', justifyContent: 'space-between', height: deviceHeightPart*1.5, flexDirection: 'row', marginBottom: 5, width: deviceWidth-10, marginLeft: 5, borderWidth: 1, borderRadius: 15}}>
                          <Text style={{fontSize: 24, marginLeft: 3.5, shadowOpacity: 0.25, paddingLeft: 5, color: colorOfText, shadowOpacity: 0.5}}>{item.label}</Text>
                          <TouchableOpacity onPress={() => {removalTriggered(index)}}>
                            <View style={{backgroundColor: lighterRed, display: 'flex', shadowOpacity: 0.25, textAlign: 'center', marginRight: 5, alignItems: 'center', justifyContent: 'center', height: deviceHeightPart, width: deviceHeightPart, borderWidth: 1, borderRadius: 25}}>
                              <Text style={{fontSize: 24, shadowOpacity: 0.25, fontWeight: 'bold', paddingBottom: 2}}>–</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }
                    />

                    <Modal
                    transparent={true}
                    visible={deleteConfirmVis}
                    animationType='slide'
                    // animationType='fade'
                    style={{}}>
                      {/* <BlurView> */}
                        <SafeAreaView>
                          <View style = {{backgroundColor: 'white', borderRadius: 15, width: '80%', left: '10%', height: 200, top: (deviceHeight - 200)/2, justifyContent: 'center', alignContent: 'center'}}>
                            <Text style = {{position: 'absolute', top: '5%', textAlign: 'center', padding: 15}}>By deleting this college any notes and ratings will be permanently deleted. If you recreate the same college the notes and ratings will not be relinked.  Upon deletion there is no way to restore any data.</Text>{/*  Any photos linked will not be deleted.  If you recreate this college any photos previously linked to the college will not be linked.</Text>*/}
                            <TouchableOpacity onPress={() => {setDeleteConfirmVis(false)}}
                              style = {{position: 'absolute', backgroundColor: 'green', borderWidth: 0, borderColor: 'black', borderRadius: 5, bottom: '10%', left: '15%'}}
                              >
                              <Text style = {{padding: 5}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {removeValueCollage(indexOfRemoval); setDeleteConfirmVis(false)}}
                              style = {{backgroundColor: 'red', borderWidth: 0, borderColor: 'black', borderRadius: 5, position: 'absolute', bottom: '10%', right: '15%'}}
                              >
                              <Text style = {{padding: 5}}>Confirm and Remove</Text>
                            </TouchableOpacity>
                          </View>
                        </SafeAreaView>
                      {/* </BlurView> */}
                    </Modal>


                    <View style={{width: deviceWidth, height: deviceHeightPart*22.5}}></View>

                  </SafeAreaView>
                </Modal>
              
              {Platform.OS == 'android' ? (<View style={{positon: 'relative', top: 0, left: 0, height: taskbarHeight*1.75, width: deviceWidth}}></View>):null}

              <ScrollView style={{height: (deviceHeight)}}>
                <TouchableOpacity onPress={() => {editOrNotColor = littleSection, setNewWeights()}}><View style={{backgroundColor: editOrNotColor, height: deviceHeightPart, width: deviceWidth/3, marginLeft: deviceWidth/3, justifyContent: 'center', alignText: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 15}}><Text style={{color: colorOfText, shadowOpacity: 0.5}}>Save</Text></View></TouchableOpacity>
                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, border: 'gray', marginTop: 5, justifyContent: 'flex-start', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[0].name}</Text></View>
                  <TextInput
                    style={S1Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS1Focus(true)}}
                    onBlur={() => {setS1Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS1) => {editOrNotColor = 'red', setValueS1(valueS1)}}
                    value={valueS1}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -1, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[1].name}</Text></View>
                  <TextInput
                    style={S2Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS2Focus(true)}}
                    onBlur={() => {setS2Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS2) => {editOrNotColor = 'red', setValueS2(valueS2)}}
                    value={valueS2}
                  />
                </View>
              
                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -2, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[2].name}</Text></View>
                  <TextInput
                    style={S3Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS3Focus(true)}}
                    onBlur={() => {setS3Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS3) => {editOrNotColor = 'red', setValueS3(valueS3)}}
                    value={valueS3}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -3, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[3].name}</Text></View>
                  <TextInput
                    style={S4Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS4Focus(true)}}
                    onBlur={() => {setS4Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS4) => {editOrNotColor = 'red', setValueS4(valueS4)}}
                    value={valueS4}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -4, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[4].name}</Text></View>
                  <TextInput
                    style={S5Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS5Focus(true)}}
                    onBlur={() => {setS5Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS5) => {editOrNotColor = 'red', setValueS5(valueS5)}}
                    value={valueS5}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -5, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[5].name}</Text></View>
                  <TextInput
                    style={S6Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS6Focus(true)}}
                    onBlur={() => {setS6Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS6) => {editOrNotColor = 'red', setValueS6(valueS6)}}
                    value={valueS6}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -6, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[6].name}</Text></View>
                  <TextInput
                    style={S7Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS7Focus(true)}}
                    onBlur={() => {setS7Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS7) => {editOrNotColor = 'red', setValueS7(valueS7)}}
                    value={valueS7}
                  />
                </View>

                <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -7, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                  <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[7].name}</Text></View>
                  <TextInput
                    style={S8Focus ? styles.focusedInputBox:styles.blurredInputBox}
                    keyboardAppearance='dark'
                    caretHidden={true}
                    returnKeyType='done'
                    onFocus={() => {setS8Focus(true)}}
                    onBlur={() => {setS8Focus(false)}}
                    keyboardType='number-pad'
                    onChangeText={(valueS8) => {editOrNotColor = 'red', setValueS8(valueS8)}}
                    value={valueS8}
                  />
                </View>
                {/* <TouchableOpacity style={{backgroundColor: 'red', height: deviceHeightPart, zIndex: -100}} onPress={() => {updateWeights(), console.log(weights)}}><Text>LOG WEIGHTS</Text></TouchableOpacity> */}
                <View style={{zIndex: -100000, height: deviceHeightPart*20, justifyContent: 'flex-end',}}></View>
              </ScrollView>
            </>) : null}</View>

{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            <View>{valueMenu=='myColleges' ? (<>
              {/* <View style={{position: 'absolute', top: -deviceHeightPart*2.15, left: deviceWidth/2+10, backgroundColor: iconColor, borderWidth: 1, marginTop: 0, borderRadius: 150, height: taskbarHeight+10, alignItems: 'center', justifyContent: 'center', width: iconWidth+10}}>
                <TouchableOpacity onPress={() => {reloadRatings()}} style={{height: taskbarHeight, width: iconWidth}}>
                  <Image source={reloadIcon} style={{height: taskbarHeight, width: iconWidth}}/>
                </TouchableOpacity>
              </View> */}
              {Platform.OS === 'android' ? (<View style={{positon: 'relative', top: 0, left: 0, height: taskbarHeight*1.75, width: deviceWidth}}></View>):null}
              <View style={{shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.5, marginBottom: 10, width: deviceWidth}}>
                <View style={{backgroundColor: sectionBackgroundColor, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', height: 42, width: deviceWidth-10, marginLeft: 5, borderWidth: 1, borderRadius: 5}}>
                  <Text style={{fontSize: 32, marginLeft: 3.5, paddingLeft: 4.5, color: colorOfTitleText, shadowOpacity: 0.5}}>College Name</Text>
                  <View style={{alignItems: 'flex-end', marginRight: 5}}>
                    <Text style={{fontSize: 32, color: colorOfTitleText, shadowOpacity: 0.5}}>Score</Text>
                  </View>
                </View>
              </View>
              <View style={{display:'flex', position:'absolute', left: (deviceWidth/2) - ((deviceWidth/8)/2), top: Platform.OS === 'ios' ? (deviceHeight)/8:deviceHeight/4, zIndex: 10000, marginVertical: 10}}>
                <Modal
                  transparent={true}
                  visible={loadModalOpen}
                  animationType='fade'
                  style={{height: deviceHeight/2, width: deviceWidth, top: deviceHeight/2}}
                >
                  <ActivityIndicator
                    animating = {!ratingsLoaded}
                    size={deviceWidth/8}
                    color = {MD2Colors.grey500}
                    style={{height: deviceWidth/2, width: deviceWidth, top: deviceHeight/5, left: 0}}
                  />
                </Modal>
              </View>
              <FlatList 
                data={FWT.slice()}
                style={{display: 'flex', height: deviceHeight}}
                ListFooterComponent={<View style={{marginTop: 5, backgroundColor: color, zIndex: -100000, height: deviceHeightPart*10, justifyContent: 'flex-end'}}></View>}
                renderItem={({ item, index }) => 
                  <View style={{backgroundColor: sectionBackgroundColor, height: Platform.OS === 'android' ? deviceHeightPart:null, marginTop: 5, width: deviceWidth-10, marginLeft: 5, borderWidth: 1, borderRadius: 5}}>
                    <Text style={{fontSize: 24, marginLeft: 3.5, paddingLeft: 4.5, color: colorOfText, shadowOpacity: 0.5}}>{FWT[index].name}</Text>
                    <View style={{alignItems: 'flex-end', marginTop: -26, marginRight: 5}}>
                      <Text style={{fontSize: 24, marginLeft: 3.5, position: Platform.OS == 'android' ? 'relative':null, marginTop: Platform.OS == 'android' ? -6:null, color: colorOfText, shadowOpacity: 0.5}}>
                        {Math.round(FWT[index].value*100)/100}
                      </Text>
                    </View>
                    {/* <Text style={{fontSize: 24, marginLeft: 3.5, color: colorOfText, shadowOpacity: 0.5}}>{ratingsTotals[index]}</Text> */}
                    {/* <View style={{alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: -24}}>
                      {/* <TouchableOpacity onPress={() => {getRatings(item.ratingKey)}}><Text>LOG RATING</Text></TouchableOpacity> 
                      <TouchableOpacity onPress={() => {console.log('getRatingsOutput'), console.log(getRating(item.ratingKey))}}><Text style={{marginTop: 10}}>LOG IT</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => {console.log(ratingsTotals)}}><View><Text style={{marginTop: 10}}>logList</Text></View></TouchableOpacity>

                    </View> */}
                  </View>
                }
                // keyExtractor={(item) => item.key}
              />
              <View style={{zIndex: -100000, height: deviceHeightPart*20, justifyContent: 'flex-end',}}></View>
              <View style={{height: 50}}></View>

              
            </>) : null}</View>

{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            <View>{valueMenu=='home' ? (<>
              <View style={{}}>{value=='select' ? (<>
                {/*<FlatList 
                  data={names.slice()}
                  style={{display: 'flex', height: deviceHeight}}
                  ListFooterComponent={<View style={{marginTop: 5, backgroundColor: color, zIndex: -100000, height: deviceHeightPart*10, justifyContent: 'flex-end'}}></View>}
                  renderItem={({ item, index }) => 
                    <View style={{backgroundColor: sectionBackgroundColor, height: deviceHeightPart, marginTop: 5, width: deviceWidth-10, marginLeft: 5, borderWidth: 1, borderRadius: 5}}>
                      <Text style={{fontSize: 24, left: deviceWidth/2, color: colorOfText, shadowOpacity: 0.5}}>{names[index].name}</Text>
                    </View>
                  }
                />
                <View style={{zIndex: -100000, height: deviceHeightPart*20, justifyContent: 'flex-end',}}></View>
                {/* <View style={{height: 50, width: deviceWidth, position: 'absolute', bottom: 0}}><TouchableOpacity onPress={() => {console.log(valueT.slice(1))}}><View style={{height: 50}}><Text style={{fontSize: 18}}>LOG THINGS</Text></View></TouchableOpacity></View> 
                <View style={{height: 50}}></View> */}
              </>):null}</View>
              <View style={{}}>{value!='select' ? (<>

                <View style={{height: deviceHeightPart*2, backgroundColor: littleSection, zIndex: -1, border: 'gray', marginTop: 5, justifyContent: 'center', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 15, width: deviceWidth-10, }}>
                  <View><Text style={{fontSize: deviceHeightPart, shadowOpacity: 0.5, color: 'white', fontWeight: 'bold', margin: 5}}>{colleges[colleges.findIndex(e => e.value == value)].label}</Text></View>
                </View>
                <View style={{}}>
                <TouchableOpacity onPress={() => {setNewRatings()}} style={{paddingTop: 5}}><View style={{backgroundColor: editOrNotColor, height: deviceHeightPart, width: deviceWidth/3, marginLeft: deviceWidth/3, justifyContent: 'center', alignText: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 15}}><Text style={{color: colorOfText, shadowOpacity: 0.5}}>Save</Text></View></TouchableOpacity>
                <ScrollView style={{height: (deviceHeightPart*2)*16}}>
                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -1, border: 'gray', marginTop: 5, justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[0].name}</Text></View>
                    <TextInput
                      style={M1Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM1Focus(true)}}
                      onBlur={() => {setM1Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM1) => {editOrNotColor = 'red', setValueM1(valueM1)}}
                      value={valueM1}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -2, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[1].name}</Text></View>
                    <TextInput
                      style={M2Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM2Focus(true)}}
                      onBlur={() => {setM2Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM2) => {editOrNotColor = 'red', setValueM2(valueM2)}}
                      value={valueM2}
                    />
                  </View>
                
                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -3, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[2].name}</Text></View>
                    <TextInput
                      style={M3Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM3Focus(true)}}
                      onBlur={() => {setM3Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM3) => {editOrNotColor = 'red', setValueM3(valueM3)}}
                      value={valueM3}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -4, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[3].name}</Text></View>
                    <TextInput
                      style={M4Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM4Focus(true)}}
                      onBlur={() => {setM4Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM4) => {editOrNotColor = 'red', setValueM4(valueM4)}}
                      value={valueM4}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -5, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[4].name}</Text></View>
                    <TextInput
                      style={M5Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM5Focus(true)}}
                      onBlur={() => {setM5Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM5) => {editOrNotColor = 'red', setValueM5(valueM5)}}
                      value={valueM5}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -6, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[5].name}</Text></View>
                    <TextInput
                      style={M6Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM6Focus(true)}}
                      onBlur={() => {setM6Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM6) => {editOrNotColor = 'red', setValueM6(valueM6)}}
                      value={valueM6}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -7, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[6].name}</Text></View>
                    <TextInput
                      style={M7Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM7Focus(true)}}
                      onBlur={() => {setM7Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM7) => {editOrNotColor = 'red', setValueM7(valueM7)}}
                      value={valueM7}
                    />
                  </View>

                  <View style={{height: deviceHeightPart*2, backgroundColor: sectionBackgroundColor, zIndex: -8, border: 'gray', justifyContent: 'right', marginLeft: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderWidth: 1, borderRadius: 10, width: deviceWidth-10, }}>
                    <View style={{width:(7.3*(deviceWidth))/10}}><Text style={styles.factors}>{factors[7].name}</Text></View>
                    <TextInput
                      style={M8Focus ? styles.focusedInputBox:styles.blurredInputBox}
                      keyboardAppearance='dark'
                      caretHidden={true}
                      returnKeyType='done'
                      onFocus={() => {setM8Focus(true)}}
                      onBlur={() => {setM8Focus(false)}}
                      keyboardType='number-pad'
                      onChangeText={(valueM8) => {editOrNotColor = 'red', setValueM8(valueM8)}}
                      value={valueM8}
                    />
                  </View>
                  <View style={{zIndex: -100000, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      // height: '20%',
                      height: 200,
                      width: deviceWidth - 10,
                      padding: 5,
                      // bottom: '2%',
                      textAlign: 'top',
                      justifyContent: 'top',
                      alignItems: 'left',
                      color: 'black',
                      backgroundColor: 'white',
                    }}
                    keyboardAppearance='dark'
                    returnKeyType='done'
                    placeholder='General College Notes'
                    autoCorrect = {true}
                    autoCapitalize = 'sentences'
                    // onChangeText={setGenNotes}
                    onChangeText={(genNotes) => {editOrNotColor = 'red'; genNotes === "" ? setGenNotes(" "):setGenNotes(genNotes)}}
                    value={genNotes}
                  /></View>
                  {/* <TouchableHighlight onPress={() => setFactors(initFactors)}><Text>RESET FACTORS</Text></TouchableHighlight> */}
                  {/*<TouchableOpacity onPress={() => {setNewRatings()}} style={{paddingTop: 5}}><View style={{backgroundColor: littleSection, height: deviceHeightPart, width: deviceWidth/3, marginLeft: deviceWidth/3, justifyContent: 'center', alignText: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 15}}><Text style={{color: colorOfText, shadowOpacity: 0.5}}>Save</Text></View></TouchableOpacity>*/}
                  <View style={{zIndex: -100000, height: deviceHeightPart*25, justifyContent: 'flex-end',}}></View>
                  </ScrollView>
                  </View>
                </>) : null}</View>

              
            </>) : null}</View>
          </View>
 
         
        </SafeAreaView>{/*): null}*/}
        </>) : null}</View>


        {/* <View style={styles.container}>{firstTime=='true' ? (<>

            <TouchableOpacity style={{margin: 5}} onPress={() => {initUser()}}>{/*</TouchableOpacity></SafeAreaView>, Alert.alert('Modal Closed'), console.log('Modal Closed')}}>*
                <View style={{height: deviceHeightPart*1.5, margin: 2, borderWidth: 1, borderRadius: 5, backgroundColor: iconColor, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: deviceHeightPart-10, margin: 0}}>Initialize User Data</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 5}} onPress={() => {onCollegesValueChange()}}>{/*</TouchableOpacity></SafeAreaView>, Alert.alert('Modal Closed'), console.log('Modal Closed')}}>*
                <View style={{height: deviceHeightPart*1.5, margin: 2, borderWidth: 1, borderRadius: 5, backgroundColor: iconColor, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: deviceHeightPart-10, margin: 0}}>Test Func</Text>
                </View>
            </TouchableOpacity>

        </>) : null}</View> */}


    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color,
    // alignItems: 'center',
  },
  blurredInputBox: {
    borderWidth: 1,
    borderRadius: 10,
    height: taskbarHeight,
    width: taskbarHeight,
    position: 'relative',
    left: taskbarHeight/1.7,
    top: 0,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'top',
    alignItems: 'right',
    color: numberInputTextColor,
    fontSize: taskbarHeight/3,
    backgroundColor: numberInputBoxBgColor,
    zIndex: 100,
  },
  focusedInputBox: {
    borderWidth: 1,
    borderRadius: 10,
    height: taskbarHeight,
    width: taskbarHeight,
    position: 'relative',
    left: taskbarHeight/1.7,
    top: 0,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'top',
    alignItems: 'right',
    color: numberInputTextColor,
    fontSize: taskbarHeight/3,
    backgroundColor: "#363c52",
    zIndex: 100,
  },
  colleges: {
    position: 'absolute',
    top: deviceHeight/4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: -1,
  },
  pages: {
    textAlign: 'center',
  },
  topMargin: {
    backgroundColor: color,
    // backgroundColor: 'purple',
    height: 34,
    width: deviceWidth,
    position: Platform.OS === 'ios' ? 'relative':'absolute',
    left: 0,
    top: Platform.OS === 'ios' ? 0 :deviceHeightPart*1.5,
    justifyContent: 'bottom',
    alignItems: 'center',
    fontSize: 24,
    borderRadius: 2,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.7,
    shadowRadius: 3,
    elevation: Platform.OS === 'ios' ? 5:10,
  },
  topTaskbar: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: deviceHeightPart*2,
    width: deviceWidth,
  },
  factors: {
    fontSize: 24, 
    fontWeight: 'bold', 
    margin: 5,
    color: colorOfText,
    shadowOpacity: 0.5
  },
  devMenuItem: {
    backgroundColor: littleSection,
    width: deviceWidth/2,
    height: deviceHeightPart*2,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: deviceWidth/16,
    justifyContent: 'center',
    alignText: 'center',
    alignItems: 'center',
    color: colorOfText,
  },
  devMenuItemText: {
    color: colorOfText,
    shadowOpacity: 0.5,
  },
});