export default function AppReducer(state, action) {
  /* Reducer is a function to change your state
  and send it down to your application */
  switch (action.type) {
    case 'GET_WORD_DEFINITION':
      return { ...state, data: [action.payload] };

    case 'ADD_ACTIVE_COLLECTION':
      state.data.collections.forEach((element) => {
        if (element.id === action.payload) element.isActive = true;
      });
      return {
        ...state,
        data: {
          words: state.data.words,
          collections: state.data.collections,
        },
      };

    case 'DELETE_ACTIVE_COLLECTION':
      state.data.collections.forEach((element) => {
        if (element.id === action.payload) element.isActive = false;
      });
      return {
        ...state,
        data: {
          words: state.data.words,
          collections: state.data.collections,
        },
      };

    case 'DELETE_COLLECTION':
      return {
        ...state,
        data: {
          words: state.data.words,
          collections: state.data.collections.filter((element) => {
            return element.id !== action.payload;
          }),
        },
      };

    case 'GET_COLLECTIONS':
      return state;

    case 'ERROR':
      return { ...state, loading: false, data: action.payload };

    default:
      return state;
  }
}
