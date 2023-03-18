import React, { createContext, useContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { v4 } from 'uuid';
import { API } from '../constants';

// Initial mock state
const words = [
  { word: 'source', id: v4() },
  { word: 'target', id: v4() },
  { word: 'delete', id: v4() },
  { word: 'update', id: v4() },
  { word: 'read', id: v4() },
  { word: 'create', id: v4() },
];

const initialState = {
  data: {
    words: words,
    collections: [
      {
        title: 'verbs',
        id: v4(),
        words: words.slice(-4).map((word) => word.id),
        isActive: true,
      },
      {
        title: 'nouns',
        id: v4(),
        words: words.slice(0, 2).map((word) => word.id),
        isActive: false,
      },
    ],
  },
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);
// Provider component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getDefinition() {
    try {
      /*
      const response = await fetch(
      `https://api`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      */
      const response = await axios.get(API);

      dispatch({
        type: 'GET_WORD_DEFINITION',
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response.data.error,
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
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export function useWordsContext() {
  return useContext(GlobalContext);
}
