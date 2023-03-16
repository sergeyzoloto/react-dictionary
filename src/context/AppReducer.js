export default function AppReducer(state, action) {
  /* Reducer is a function to change your state
  and send it down to your application */
  switch (action.type) {
    case 'SOME_ACTION':
      return;
    default:
      return state;
  }
}
