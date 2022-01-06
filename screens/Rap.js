import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Theme from '../constants/theme';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Voice from '@react-native-voice/voice';
import theme from '../constants/theme';

const Rap = () => {
  const API =
    'https://rhymebrain.com/talk?function=getRhymes&maxResults=20&word=';
  //for getting the matching rhymes
  const [rhymes, setRhymes] = useState([]);

  //for speech to text and recording freestyle
  const [freestyle, setFreestyle] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    function onSpeechResults(e) {
      //add line to the freestyle
      setFreestyle(freestyle => [...freestyle, e.value[0] + ', ']);
      //finding the last word's rhymes
      let line = e.value[0];
      axios.get(API + line.split(' ').pop()).then(res => {
        setRhymes(res.data);
      });
      setIsListening(false);
    }
    function onSpeechError(e) {
      console.error(e);
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function toggleListening() {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        await Voice.start('en-US');
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Text
          style={[
            styles.buttonText,
            {
              color: Theme.COLORS.WHITE,
              marginTop: 40,
              fontSize: 18,
              fontStyle: 'italic',
              marginHorizontal:15
            },
          ]}>
          {
            isListening ? '...' : 'Press start and spit some 🔥'
          }
        </Text>
        <TouchableOpacity
          onPress={toggleListening}
          style={[
            styles.button,
            {
              backgroundColor: Theme.COLORS.PRIMARYFOCUS,
              width: 200,
              marginTop: 40,
            },
          ]}>
          <Text style={[styles.buttonText, {color: Theme.COLORS.WHITE}]}>
            {isListening ? 'listening' : 'Start'}
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.buttonText,
            {
              color: Theme.COLORS.WHITE,
              marginTop: 40,
              fontSize: 18,
              fontStyle: 'italic',
              opacity: 0.9,
            },
          ]}>
          {freestyle.length != 0
            ? freestyle
            : '" Your freestyle will be shown here "'}
        </Text>
        {rhymes.length == 0 ? (
          <Text
            style={[
              styles.buttonText,
              {
                color: Theme.COLORS.WHITE,
                marginTop: 160,
                fontSize: 14,
                fontStyle: 'italic',
                opacity: 0.7,
              },
            ]}>
            ** Matching rhymes will be shown here **
          </Text>
        ) : (
          <Text
            style={[
              styles.buttonText,
              {
                color: Theme.COLORS.WHITE,
                marginTop: 160,
                fontSize: 17,
                fontStyle: 'italic',
                opacity: 0.7,
                marginHorizontal:10
              },
            ]}>
            {rhymes.map((rhyme, index) => {
            return <Text key={`result-${index}`}>{rhyme.word},   </Text>;
          })}
          </Text>
          
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.text,{color:theme.COLORS.WHITE}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.text,{color:theme.COLORS.WHITE}]}>Freestyles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.text,{color:theme.COLORS.WHITE}]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BLACK,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.PRIMARYFOCUS,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  navItem: {
    marginTop: 35,
    color: Theme.COLORS.WHITE,
  },
  body: {
    flex: 12,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexWrap:'wrap',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,

  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  icons: {
    width: 40,
    height: 40,
  },
  signout: {
    width: 20,
    height: 20,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 5,
    paddingBottom: 7,
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Rap;
