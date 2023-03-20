import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { API } from '../context/constants.js';

// Initial mock state
const words = [
  { word: 'source', id: '1' },
  { word: 'target', id: '2' },
  { word: 'delete', id: '3' },
  { word: 'update', id: '4' },
  { word: 'read', id: '5' },
  { word: 'create', id: '6' },
];

const initialState = {
  data: {
    words: words,
    collections: [
      {
        title: 'verbs',
        id: '7',
        words: words.slice(-4).map((word) => word.id),
        isActive: true,
      },
      {
        title: 'nouns',
        id: '8',
        words: words.slice(0, 2).map((word) => word.id),
        isActive: false,
      },
    ],
  },
  error: null,
  loading: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  function checkStorage() {
    if (localStorage.getItem('words_storage')) {
      return JSON.parse(localStorage.getItem('words_storage'));
    } else {
      return initialState;
    }
  }

  const savedData = checkStorage();
  const [state, dispatch] = useReducer(AppReducer, savedData);

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('words_storage', JSON.stringify(state));
  }, [state]);

  // Actions
  async function getDefinition(query) {
    try {
      dispatch({
        type: 'LOADING',
      });

      const response = await axios.get(API + query);
      dispatch({
        type: 'GET_WORD_DEFINITION',
        payload: response.data,
      });
    } catch (error) {
      console.log(
        'error',
        Object.keys(error.response.data),
        error.response.data,
      );
      dispatch({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  }

  function addActiveCollection(id) {
    dispatch({
      type: 'ADD_ACTIVE_COLLECTION',
      payload: id,
    });
  }

  function deleteActiveCollection(id) {
    dispatch({
      type: 'DELETE_ACTIVE_COLLECTION',
      payload: id,
    });
  }

  function deleteCollection(id) {
    dispatch({
      type: 'DELETE_COLLECTION',
      payload: id,
    });
  }

  function updateCollection(collection) {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: collection,
    });
  }

  function addCollection(collection) {
    dispatch({
      type: 'ADD_COLLECTION',
      payload: collection,
    });
  }

  function deleteWord(id) {
    dispatch({
      type: 'DELETE_WORD',
      payload: id,
    });
  }

  function updateWord(word) {
    dispatch({
      type: 'UPDATE_WORD',
      payload: word,
    });
  }

  function addWord(word) {
    dispatch({
      type: 'ADD_WORD',
      payload: word,
    });
  }

  function getCollections() {
    dispatch({
      type: 'GET_COLLECTIONS',
    });
  }

  function addWordToCollection(wordId, collectionId) {
    dispatch({
      type: 'ADD_WORD_TO_COLLECTION',
      payload: { wordId, collectionId },
    });
  }

  function removeWordFromCollection(wordId, collectionId) {
    dispatch({
      type: 'REMOVE_WORD_FROM_COLLECTION',
      payload: { wordId, collectionId },
    });
  }

  const value = {
    data: state.data,
    loading: state.loading,
    error: state.error,
    getDefinition,
    getCollections,
    deleteCollection,
    updateCollection,
    addCollection,
    deleteWord,
    updateWord,
    addWord,
    addActiveCollection,
    deleteActiveCollection,
    addWordToCollection,
    removeWordFromCollection,
    sideBarIsOpen,
    setSideBarIsOpen,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export function useWordsContext() {
  return useContext(GlobalContext);
}
