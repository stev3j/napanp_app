import { ScrollView, Button, StyleSheet, View, Animated, } from 'react-native';
import colors from '../styles/colors';
import styled from 'styled-components/native';
import { Spacer } from '../utils/UtilFunctions';
import { useAppDispatch } from '../redux/hook';
import { setMinute, setSecond } from '../redux/slices/timer';

const timeList = [
    '', '', '', '0','1','2','3','4','5','6','7','8','9',
    '10','11','12','13','14','15','16','17','18','19',
    '20','21','22','23','24','25','26','27','28','29',
    '30','31','32','33','34','35','36','37','38','39',
    '40','41','42','43','44','45','46','47','48','49',
    '50','51','52','53','54','55','56','57','58','59', '60', '', ''
];

let minuteY;
let secondY;

const TimePicker = () => {
    const dispatch = useAppDispatch();
    
    const handleMinutes = (event: any) => {
        minuteY = Math.floor(event.nativeEvent.contentOffset.y / 36.5)
        console.log(minuteY);
        if (minuteY < 0) dispatch(setMinute({minute: '00'}))
        else if (minuteY > 60) dispatch(setMinute({minute: '60'}))
        else if (minuteY < 10) dispatch(setMinute({minute: '0'+minuteY}))
        else dispatch(setMinute({minute: minuteY}))
        
    }

    const handleSeconds = (event: any) => {
        secondY = Math.floor(event.nativeEvent.contentOffset.y / 36.5)
        console.log(secondY);
        if (secondY < 0) dispatch(setSecond({second: '00'}))
        else if (secondY > 60) dispatch(setSecond({second: '60'}))
        else if (secondY < 10) dispatch(setSecond({second: '0'+secondY}))
        else dispatch(setSecond({second: secondY}))
    }

    return (
        <View style={styles.view}>
          <OverlayView >
            <SubTimeText style={{marginStart: 54}}>분</SubTimeText>
            <Spacer/>
            <SubTimeText style={{marginEnd: 24}}>초</SubTimeText>
          </OverlayView>
          <View style={styles.container}>
            <ScrollView
                onScroll={handleMinutes}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollView]}
            >
                {timeList.map((item) => (
                    <TimeText>{item}</TimeText>
                ))}
            </ScrollView>
            <ScrollView
                style={{marginEnd: 20}}
                onScroll={handleSeconds}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {timeList.map((item) => (
                    <TimeText>{item}</TimeText>
                ))}
            </ScrollView>
          </View>

        </View>
      );
}

const TimeText = styled.Text`
    font-size: 24px;
    color: ${colors.text_gray_100};
    margin-bottom: 8px;
`

const SubTimeText = styled.Text`
    font-size: 16px;
    color: ${colors.text_gray_100};
`

const OverlayView = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #4E4C4C;
    height: 39px;
    margin-left: 100px;
    margin-right: 100px;
    border-radius: 8px;
`

const BUTTON_HEIGHT = 50;
const VIEW_HEIGHT = 50 * 3;

const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: colors.container_gray_700,
    },
    container: {
        position: 'absolute',
      alignSelf: 'center',
      flexDirection: 'row',
      height: VIEW_HEIGHT,
      marginLeft: 100,
      marginRight: 80,
    },
    scrollView: {
      width: 100,
      alignItems: 'center',
    },
    overlay: {
        position: 'relative',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayVisibleView: {
      width: '100%',
      height: BUTTON_HEIGHT,
      flexDirection: 'row',
    },
    overlayVisibleViewInner: {
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#c8c8c8',
    },
  });
  

export default TimePicker;