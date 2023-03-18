import React, { createContext, useContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { API } from '../constants';

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
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);
// Provider component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

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
