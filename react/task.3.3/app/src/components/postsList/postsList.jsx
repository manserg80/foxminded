import React from 'react';
import { connect } from 'react-redux';
import { addPosts } from '../../redux/actions';
import useDataFetching from '../hooks/useDataFetching';

const PostsList = ({ posts, addPosts }) => {
  useDataFetching('https://jsonplaceholder.typicode.com/posts', addPosts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { addPosts })(PostsList);