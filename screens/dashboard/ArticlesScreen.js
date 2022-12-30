import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {REMOVE_TOKEN, setArticles, SET_ARTICLES} from '../../redux/actions';
import ArticleItem from '../../components/articles/ArticleItem';
import Colors from '../../constants/Colors';

const ArticlesScreen = () => {
  const dispatch = useDispatch();
  const [allArticles, setAllarticles] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [noData, setNoData] = useState(false);
  const [token, setToken] = useState(
    useSelector(state => state.userReducer.token),
  );

  const handleSearch = text => {
    const formattedQuery = text;
    const results = fullData.filter(article =>
      article.document_type.includes(formattedQuery),
    );
    setAllarticles(results);
    setQuery(formattedQuery);
    if (results.length === 0) {
      setNoData(true);
      setIsLoading(false);
    } else {
      setNoData(false);
    }
    setQuery(text);
  };

  const getArticlesApi = () => {
    axios
      .get('http://34.245.213.76:3000/articles?page=' + pageIndex, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        const articles = response.data.response.docs;

        dispatch({type: SET_ARTICLES, articles});
        setAllarticles(articles);
        let newArray;

        if (articles && articles.length === 0) {
          setArticles(response.data.response.docs);
          setFullData(response.data.response.docs);
        } else {
          const newArray = articles.concat(response.data.response.docs);

          setArticles(newArray);
          setFullData(newArray);
          if (response.data.response.docs.length === 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticlesApi();
  }, []);

  const fetchMoreData = () => {
    // setIsLoading(true);
    setHasMore(true);
    console.log('endReached');
    if (pageIndex < 3) {
      if (hasMore) {
        setPageIndex(pageIndex + 1);
        setTimeout(() => {
          getArticlesApi();
        }, 500);
      } else if (pageIndex === 3) {
        setHasMore(false);
        return;
      }
    } else {
      setPageIndex(pageIndex - 1);
      setHasMore(false);
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} margin={20} />
      ) : (
        <View>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => handleSearch(text)}
            value={query}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <FlatList
            data={allArticles}
            keyExtractor={article => article._id}
            onEndReached={() => {
              fetchMoreData();
            }}
            renderItem={({item}) => {
              return (
                <ArticleItem
                  source={item.source}
                  title={
                    item.headline.main ? item.headline.main : 'not available'
                  }
                  parag={item.lead_paragraph.substring(0, 100)}
                  secName={item.section_name}
                  type={item.document_type}
                  author={
                    item.byline.original
                      ? item.byline.original
                      : 'not available'
                  }
                  onPress={() => {
                    Alert.alert('The Article', item.lead_paragraph, [
                      {text: 'Done'},
                    ]);
                  }}
                />
              );
            }}
          />
        </View>
      )}
      {noData && (
        <View style={styles.data}>
          <Text>No Articles Found.</Text>
        </View>
      )}
    </View>
  );
};

export const screenOptions = ({navigation}) => {
  const dispatch = useDispatch();
  return {
    headerTitle: 'Articles',
    headerLeft: () => (
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          color="#6FB3B8"
          borderRadius={20}
          onPress={() => {
            navigation.navigate('Auth');
            dispatch({type: REMOVE_TOKEN});
          }}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  data: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default ArticlesScreen;
