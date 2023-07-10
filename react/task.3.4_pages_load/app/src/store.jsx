import { createStore, combineReducers } from 'redux';
import { postsReducer } from './components/postsList/postsList';
import { todosReducer } from './components/todoList/todoList';
import { usersReducer } from './components/userList/userList'

const rootReducer = combineReducers({
    posts: postsReducer,
    todos: todosReducer,
    users: usersReducer,
  });
  
const store = createStore(rootReducer);

export default store;