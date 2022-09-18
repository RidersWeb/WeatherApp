import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';


export default function Weather({temp, city}){
  return (
    <View style={styles.container}>
      <Text>В {city} {temp} градусов</Text>
    </View>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
