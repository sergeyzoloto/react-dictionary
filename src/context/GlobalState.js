import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial mock state
const initialState = {
  collections: [],
  words: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);
// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function someAction() {
    try {
      const response = await axios.get('/api');
      /* const response = await fetch(
      `https://api`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },*/

      dispatch({
        type: 'SOME_ACTION',
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'SOME_ACTION',
        payload: error.response.data.error,
      });
    }
  }

  const value = {
    collections: state.data.collections,
    words: state.data.words,
    error: state.error,
    loading: state.loading,
    someAction,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
