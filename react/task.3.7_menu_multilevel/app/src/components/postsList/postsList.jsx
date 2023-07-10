import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './postList.css';

const PostForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      onSubmit(response.data);
      reset();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        type="text"
        placeholder="Enter post title"
        {...register('title', { required: true, minLength: 3 })}
      />
      {errors.title && errors.title.type === 'required' && (
        <span className="error">Title is required.</span>
      )}
      {errors.title && errors.title.type === 'minLength' && (
        <span className="error">Title should be at least 3 characters long.</span>
      )}
      <textarea
        placeholder="Enter post body"
        {...register('body', { required: true, minLength: 3 })}
      ></textarea>
      {errors.body && errors.body.type === 'required' && (
        <span className="error">Body is required.</span>
      )}
      {errors.body && errors.body.type === 'minLength' && (
        <span className="error">Body should be at least 3 characters long.</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [setNewPostTitle] = useState('');
  const [setNewPostBody] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  const [editPostTitleError, setEditPostTitleError] = useState('');
  const [editPostBodyError, setEditPostBodyError] = useState('');

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

    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      fetchData();
    }
  }, []);

  const handleAddPost = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = (data) => {
    if (data.title.trim() === '' || data.body.trim() === '') {
      alert('Please enter both a title and body for the post.');
      return;
    }
    const newPost = {
      id: Date.now(),
      title: data.title,
      body: data.body,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
    setShowAddForm(false);
    setNewPostTitle('');
    setNewPostBody('');
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setEditPostId(postId);
      setEditPostTitle(post.title);
      setEditPostBody(post.body);
      setShowEditForm(true);
      setEditPostTitleError('');
      setEditPostBodyError('');
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
  
    if (editPostTitle.trim() === '') {
      setEditPostTitleError('Title is required.');
      formValid = false;
    } else if (editPostTitle.length < 3) {
      setEditPostTitleError('Title should be at least 3 characters long.');
      formValid = false;
    } else {
      setEditPostTitleError('');
    }
  
    if (editPostBody.trim() === '') {
      setEditPostBodyError('Body is required.');
      formValid = false;
    } else if (editPostBody.length < 3) {
      setEditPostBodyError('Body should be at least 3 characters long.');
      formValid = false;
    } else {
      setEditPostBodyError('');
    }
  
    if (formValid) {
      const updatedPost = {
        id: editPostId,
        title: editPostTitle,
        body: editPostBody,
      };
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === editPostId ? updatedPost : post))
      );
      localStorage.setItem('posts', JSON.stringify(posts));
      setShowEditForm(false);
      setEditPostId('');
      setEditPostTitle('');
      setEditPostBody('');
    }
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPosts(items);
    localStorage.setItem('posts', JSON.stringify(items));
  };

  return (
    <div className="post-list">
      <h1>Post List</h1>
      <button onClick={handleAddPost}>Add Post</button>
      {showAddForm && <PostForm onSubmit={handleFormSubmit} />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="post-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {posts.map((post, index) => (
                <Draggable key={post.id} draggableId={post.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="post"
                    >
                      {showEditForm && editPostId === post.id ? (
                        <form className="post-form" onSubmit={handleEditFormSubmit}>
                          <h3>Post Title</h3>
                          <input
                            type="text"
                            placeholder="Enter post title"
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                          />
                          {editPostTitleError && <span className="error">{editPostTitleError}</span>}
                          <h3>Post Body</h3>
                          <textarea
                            placeholder="Enter post body"
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                          ></textarea>
                          {editPostBodyError && <span className="error">{editPostBodyError}</span>}
                          <button type="submit">Update</button>
                        </form>
                      ) : (
                        <>
                          <h2>{post.title}</h2>
                          <p>{post.body}</p>
                          <div className="buttons">
                            <button onClick={() => handleEditPost(post.id)}>Edit Post</button>
                            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PostList;