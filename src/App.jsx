import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top Users</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {users.map(user => (
          <li key={user.id} className="border-b last:border-b-0 p-2">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/posts?type=popular`)
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {posts.map(post => (
          <li key={post.id} className="border-b last:border-b-0 p-2">
            {post.title} - {post.commentCount} comments
          </li>
        ))}
      </ul>
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios.get(`${BASE_URL}/posts?type=latest`)
        .then(response => setPosts(response.data))
        .catch(error => console.error("Error fetching feed:", error));
    };
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {posts.map(post => (
          <li key={post.id} className="border-b last:border-b-0 p-2">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="bg-gray-200 p-4 rounded-lg flex justify-around mb-4">
          <Link className="text-blue-600 hover:underline" to="/">Social Media Analytics</Link>
          <Link className="text-blue-600 hover:underline" to="/top-users">Top Users</Link>
          <Link className="text-blue-600 hover:underline" to="/trending-posts">Trending Posts</Link>
          <Link className="text-blue-600 hover:underline" to="/feed">Live Feed</Link>
        </nav>
        <Routes>
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<h2 className="text-xl font-bold">Welcome to Social Media Analytics</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
