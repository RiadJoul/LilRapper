import React, {useState,useEffect} from 'react';

import Theme from '../constants/theme';

import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const Rap = () => {
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    function onSpeechResults(e) {
      setResults(e.value[0]);
      console.log('results: ' + e.value[0]);
      //add line to the freestyle

      //finding the last word's rhymes
      
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
        setResults([]);
        await Voice.start("en-US");
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
            },
          ]}>
          Press start and spit some 🔥
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
            },
          ]}>
          " Your freestyle will be shown here "
        </Text>
      {
        results.map((result, index) => {
          return <Text key={`result-${index}` } style={[
            styles.buttonText,
            {
              color: Theme.COLORS.WHITE,
              marginTop: 160,
              fontSize: 17,
              fontStyle: 'italic',
              opacity: 0.7,
            },
          ]}>{result}</Text>;
        })
      }
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#BB4228'}]}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>
            Sign out{' '}
            <Image
              style={[styles.signout]}
              source={require('../assets/signout.png')}
            />
          </Text>
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
    backgroundColor: Theme.COLORS.PRIMARY,
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
    flex: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 30,
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