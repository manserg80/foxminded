import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

const addPost = (newPost) => ({
  type: ADD_POST,
  payload: newPost,
});

export const editPost = (updatedPost) => ({
  type: EDIT_POST,
  payload: updatedPost,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export { postsReducer };

const PostList = ({ addPost, editPost, deletePost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=20'
        );
        const data = response.data;
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Check if posts exist in local storage
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      fetchData();
    }
  }, []);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: 'New Post Title',
      body: 'New Post Body',
    };
    addPost(newPost);
    setPosts([...posts, newPost]);
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
  };

  const handleEditPost = (postId) => {
    const updatedPost = {
      id: postId,
      title: 'Updated Title',
      body: 'Updated Body',
    };
    editPost(updatedPost);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? updatedPost : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      <h1>Post List</h1>
      <button onClick={handleAddPost}>Add Post</button>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div className='buttons'>
            <button onClick={() => handleEditPost(post.id)}>Edit Post</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  addPost,
  editPost,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);