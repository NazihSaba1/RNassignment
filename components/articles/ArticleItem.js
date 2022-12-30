import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';

import Card from '../UI/Card';

const ArticleItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.main}>
      <TouchableCmp onPress={props.onPress} useForground>
        <View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
          <View style={styles.parag}>
            <Text style={styles.paragText}>{props.parag} ...See More</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.detailsTitleText}> Type </Text>
              <Text style={styles.detailsTitleText}> Section </Text>
              <Text style={styles.detailsTitleText}> Source </Text>
              <Text style={styles.detailsTitleText}> By </Text>
            </View>
            <View>
              <Text style={styles.detailsText}>: {props.type} </Text>
              <Text style={styles.detailsText}>: {props.secName}</Text>
              <Text style={styles.detailsText}>: {props.source} </Text>
              <Text style={styles.detailsText}>: {props.author}</Text>
            </View>
          </View>
          <View style={styles.click}>
            <Text style={styles.clickText}>
              Click To Read The Full Article.
            </Text>
          </View>
        </View>
      </TouchableCmp>
    </Card>
    // <Card style={styles.article}>
    //   <View style={styles.touchable}>
    //     <TouchableCmp onPress={props.onPress} useForground>
    //       <View>
    //         <View style={styles.cont}>
    //           <View style={styles.title}>
    //             <Text style={styles.title}>{props.title}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.abstCont}>
    //           <View style={styles.abstract}>
    //             <Text style={styles.size}>Title:</Text>
    //             <Text>{props.parag} ...see more</Text>
    //           </View>
    //         </View>
    //         <View style={styles.titles}>
    //           <View style={styles.articleDetail}>
    //             <Text style={styles.size}>Type: </Text>
    //             <Text style={styles.space}>{props.type} </Text>
    //           </View>
    //           <View>
    //             <Text style={styles.size}>Section Name:</Text>
    //             <Text style={styles.space}>{props.secName}</Text>
    //           </View>
    //           <View>
    //             <Text style={styles.size}>By:</Text>
    //             <Text style={styles.space}>{props.author}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </TouchableCmp>
    //   </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 7,
    height: 390,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Colors.accent,
    height: 50,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  parag: {
    margin: 10,
    backgroundColor: Colors.accent,
    padding: 8,
    borderRadius: 5,
  },
  paragText: {
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
  },
  detailsContainer: {
    flexDirection: 'row',
    textAlign: 'justify',
    backgroundColor: Colors.accent,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'space-between',
    padding: 8,
    borderRadius: 5,
  },
  detailsTitleText: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 4,
  },
  detailsText: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'sans-serif-condensed',
    padding: 4,
  },
  click: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.accent,
    height: 25,
    fontSize: 15,
    marginTop: 30,
  },
  clickText: {
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default ArticleItem;
