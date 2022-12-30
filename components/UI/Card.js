import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'White',
    shadowOpacity: 5,
    shadowColor: 'grey',
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default Card;
