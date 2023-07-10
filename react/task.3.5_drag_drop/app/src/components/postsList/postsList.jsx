import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

import './postList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() === '' || newPostBody.trim() === '') {
      alert('Please enter both a title and body for the post.');
      return;
    }
    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      body: newPostBody,
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
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (editPostTitle.trim() === '' || editPostBody.trim() === '') {
      alert('Please enter both a title and body for the post.');
      return;
    }
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
      {showAddForm && (
        <form className="post-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter post body"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
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
                          <input
                            type="text"
                            placeholder="Enter post title"
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                          />
                          <textarea
                            placeholder="Enter post body"
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                          ></textarea>
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