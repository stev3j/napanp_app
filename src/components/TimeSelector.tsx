// import React, { useState } from 'react'
// import { View, Text, StyleSheet, ScrollView, Button} from 'react-native'
// import { LinearGradient } from 'react-native-linear-gradient';
// // import * as Haptics from 'expo-haptics';
// import colors from '../styles/colors';
// const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
// const Minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",]

// let HoursYScroll;
// let MinutesYScroll;

// type TimeSelectorType = {
//     limit: number,
//     defaultOffsetHour: string
// }

// const TimeSelector = ({limit, defaultOffsetHour}: TimeSelectorType) => {
    
//     const [selectedHour, setSelectedHour] = useState(defaultOffsetHour)
//     const [selectedMinute, setSelectedMinute] = useState("00")
//     // const defaultOffset = limit * (defaultOffsetHour);
//     const defaultOffset = limit * 0;
    

//     const handleSelectedHour = (event: any) => {
//         HoursYScroll = event.nativeEvent.contentOffset.y;
//         if (HoursYScroll < 0) {
//             setSelectedHour("00");
//             return;
//         }
//         if (HoursYScroll > (limit * 24)) {
//             setSelectedHour("23");
//             return;
//         }
//         for (let i = 0; i < 24; i++) {
//             let a = i * limit
//             let b = (i + 1) * limit
//             if (HoursYScroll > a && HoursYScroll < b) {
//                 if (selectedHour !== Hours[i]) {
//                     setSelectedHour(Hours[i])
//                     // Haptics.selectionAsync()
//                     return;
//                 }
//             }

//         }

//     }

//     const handleSelectedMinutes = (event: any) => {
//         MinutesYScroll = event.nativeEvent.contentOffset.y;
//         if (MinutesYScroll < 0) {
//             setSelectedMinute("00");
//             return;
//         }
//         if (MinutesYScroll > (limit * 60)) {
//             setSelectedMinute("59");
//             return;
//         }
//         for (let i = 0; i < 60; i++) {
//             let a = i * limit
//             let b = (i + 1) * limit
//             if (MinutesYScroll > a && MinutesYScroll < b) {
//                 if (selectedMinute !== Minutes[i]) {
//                     setSelectedMinute(Minutes[i])
//                     // Haptics.selectionAsync()
//                     return;
//                 }
//             }

//         }

//     }


//     return <View>
//         <View style={styles.pickerConatiner}>
            
//             <View style={styles.scrollContainer}>
//             <LinearGradient
//                     // style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99, bottom : 150}}
//                     style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99}}
//                     // colors={[Colors.gradientEnd , 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//                     colors={[colors.text_gray_100 , 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//                     pointerEvents={'none'}
//                 />
//                 <View style={styles.selectedView}>
//                     <Text style={styles.selectedText}>{selectedHour}</Text>
//                     <Text style={styles.selectedLabel}>H</Text>
//                 </View>
//                 <LinearGradient
//                     style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99}}
//                     // colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', Colors.gradientEnd]}
//                     colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', colors.text_gray_100]}
//                     pointerEvents={'none'}
//                 />
                
//                 <ScrollView
//                     contentOffset={{
//                         x: 0,
//                         y: defaultOffset,
//                     }}
//                     scrollEventThrottle={16}
//                     onScroll={handleSelectedHour}
//                     showsVerticalScrollIndicator={false}
//                 >

//                     <View style={{ paddingVertical: 170 }}>
//                         {Hours.map((item, index) => {
//                             return <View style={styles.timeView} key={item}>
//                                 <Text style={styles.timeText}>{item}</Text>
//                             </View>
//                         })}
//                     </View>
//                 </ScrollView>
//             </View>
//             <View style={styles.scrollContainer}>
//             <LinearGradient
//                     // style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99, bottom : 150}}
//                     style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99}}
//                     // colors={[Colors.gradientEnd , 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//                     colors={[colors.text_gray_100 , 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//                     pointerEvents={'none'}
//                 />
//                 <View style={styles.selectedView}>
//                     <Text style={styles.selectedText}>{selectedMinute}</Text>
//                     <Text style={styles.selectedLabel}>M</Text>
//                 </View>
//                 <LinearGradient
//                     style={{ position: 'absolute', bottom: 0, width: "100%", height: 200, zIndex:99}}
//                     // colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', Colors.gradientEnd]}
//                     colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', colors.text_gray_100]}
//                     pointerEvents={'none'}
//                 />
//                 <ScrollView
//                     scrollEventThrottle={60}
//                     onScroll={handleSelectedMinutes}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <View style={{ paddingVertical: 170 }}>
//                         {Minutes.map((item, index) => {
//                             return <View style={styles.timeView} key={item}>
//                                 <Text style={styles.timeText}>{item}</Text>
//                             </View>
//                         })}
//                     </View>
                    
//                 </ScrollView>
               
//             </View>
            
//         </View>
//         <View style = {styles.button}>
//         <Button
//         title = {"Press here"}
//         color = {"white"}
//         onPress = {()=>{
//             // alert(`${selectedHour} : ${selectedMinute}`)
//             console.log(`${selectedHour} : ${selectedMinute}`)
//         }}
//         />
//         </View>

//     </View>
// }


// const styles = StyleSheet.create({

//     pickerConatiner: {
//         alignSelf: "center",
//         width: "75%",
//         height: 350,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     scrollContainer: {
//         width: "49%",
//         height: 350,
//        // borderWidth: 1
//     },
//     timeView: {
//         alignSelf: "center",
//         width: "100%",
//     },
//     timeText: {
//         fontSize: 32,
//         color: "white",
//         alignSelf: "center",
//         paddingVertical: 12
//     },
//     selectedView: {
//         height: 130,
//         width: "100%",
//         backgroundColor: colors.container_gray_700,
//         position: "absolute",
//         top: 115,
//         zIndex: 99,
//         borderRadius: 10
//     },
//     selectedText: {
//         alignSelf: "center",
//         fontSize: 50,
//         fontWeight: "400",
//         top: 40,
//         color: "white"
//     },
//     selectedLabel: {
//         color: colors.primary,
//         alignSelf: "flex-end",
//         top: 35,
//         right: 10
//     },
//     button: {
//         width : 200,
//         height : 50,
//         justifyContent : "center",
//         alignSelf : "center",
//         marginTop : 30,
//         borderRadius : 20,
//         borderColor  :"white"
//     },
//     buttonText : {
//         fontSize : 20,
//         alignSelf : "center",
//         color : "white"
//     }
// });


// export default TimeSelector;