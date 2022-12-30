import {SET_ARTICLES, SET_TOKEN, REMOVE_TOKEN} from './actions';

const initialState = {
  token: '',
  username: '',
  password: '',
};

const articles = {
  RenderedArticles: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.token};
    case REMOVE_TOKEN:
      return initialState;
    default:
      return state;
  }
}

function articlesReducer(state = articles, action) {
  switch (action.type) {
    case SET_ARTICLES:
      return {...state, RenderedArticles: action.articles};
    default:
      return state;
  }
}

export {userReducer, articlesReducer};
