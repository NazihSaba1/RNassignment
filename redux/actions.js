export const SET_TOKEN = 'SET_TOKEN';
export const SET_ARTICLES = 'SET_ARTICLES';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const setToken = token => dispatch => {

  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const removeToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setArticles = articles => dispatch => {
  dispatch({
    type: SET_ARTICLES,
    payload: articles,
  });
};
