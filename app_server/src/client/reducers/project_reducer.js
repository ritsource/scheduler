export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return action.projects;
    default:
      return state;
  }
}