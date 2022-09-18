import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as Location from 'expo-location';
import Loading from './components/Loading';
import axios from 'axios';
import Weather from './components/Weather';


const API_KEY = 'ac3e10e497f61b6640873ac0a0c5d6d9';

export default class extends React.Component {
  state = {
    isLoading: true
  }


  getWeather = async (latitude, longitude) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`)
    this.setState({isLoading: false, temp: data.main.temp, city: data.name});
    console.log(latitude, longitude)
  }

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync()
      this.getWeather(latitude, longitude)
    } catch (error) {
      Alert.alert('Не могу определить местоположение', "Очень грустно :(");
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render () {
    const {isLoading, temp, city} = this.state;
    
    return ( 
      this.state.isLoading ? <Loading /> : <Weather city={city} temp={Math.round(temp)}/>
    );
  }
}
