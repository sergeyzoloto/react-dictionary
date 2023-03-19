import { removeDuplicates } from '../utils/removeDuplicates';

export default function AppReducer(state, action) {
  /* Reducer is a function to change your state
  and send it down to your application */
  switch (action.type) {
    case 'GET_WORD_DEFINITION':
      console.log('action.payload.data', action.payload[0]);
      return {
        ...state,
        data: {
          ...state.data,
          words: state.data.words.map((word) => {
            if (word.word === action.payload[0].word) {
              return {
                word: word.word,
                id: word.id,
                dictionary: { ...action.payload[0] },
              };
            } else {
              return word;
            }
          }),
        },
      };

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

    case 'ADD_WORD_TO_COLLECTION':
      return {
        ...state,
        data: {
          ...state.data,
          collections: state.data.collections.map((collection) => {
            if (collection.id === action.payload.collectionId) {
              return {
                ...collection,
                words: removeDuplicates([
                  ...collection.words,
                  action.payload.wordId,
                ]),
              };
            } else {
              return collection;
            }
          }),
        },
      };

    case 'REMOVE_WORD_FROM_COLLECTION':
      return {
        ...state,
        data: {
          ...state.data,
          collections: state.data.collections.map((collection) => {
            if (collection.id === action.payload.collectionId) {
              console.log('collection to update is found', collection.title);
              const result = {
                ...collection,
                words: collection.words.filter((id) => {
                  return id !== action.payload.wordId;
                }),
              };
              console.log(
                'action.payload.wordId:',
                typeof action.payload.wordId,
              );
              console.log('words:', collection.words);
              console.log('result', result);
              return result;
            } else {
              return collection;
            }
          }),
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

    case 'ADD_COLLECTION':
      return {
        ...state,
        data: {
          words: state.data.words,
          collections: [action.payload, ...state.data.collections],
        },
      };

    case 'UPDATE_COLLECTION':
      return {
        ...state,
        data: {
          words: state.data.words,
          collections: state.data.collections.map((collection) => {
            if (collection.id === action.payload.id) {
              return action.payload;
            } else {
              return collection;
            }
          }),
        },
      };

    case 'ADD_WORD':
      return {
        ...state,
        data: {
          words: [action.payload, ...state.data.words],
          collections: state.data.collections,
        },
      };

    case 'UPDATE_WORD':
      return {
        ...state,
        data: {
          words: state.data.words.map((word) => {
            if (word.id === action.payload.id) {
              return action.payload;
            } else {
              return word;
            }
          }),
          collections: state.data.collections,
        },
      };

    case 'DELETE_WORD':
      return {
        ...state,
        data: {
          words: state.data.words.filter((element) => {
            return element.id !== action.payload;
          }),
          collections: state.data.collections,
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
