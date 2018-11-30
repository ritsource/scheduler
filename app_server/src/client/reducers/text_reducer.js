export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TEXTS':
      return action.texts;
    default:
      return state;
  }
}