const initialState = {
    posts: [],
    todos: [],
    users: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_POSTS':
        return { ...state, posts: action.payload };
      case 'ADD_TODOS':
        return { ...state, todos: action.payload };
      case 'ADD_USERS':
        return { ...state, users: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;