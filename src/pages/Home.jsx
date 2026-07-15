import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>Loading posts...</div>;
  }

  return (
    <div className="container animate-fade-in">
      <header className="page-header">
        <h1 className="title-large text-gradient">Discover Stories</h1>
        <p className="subtitle">Read the latest articles on design, technology, and more.</p>
      </header>

      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="glass post-card">
            {post.image_url && (
              <div className="post-image-container">
                <img src={post.image_url} alt={post.title} className="post-image" />
                <div className="post-overlay"></div>
              </div>
            )}
            
            <div className="post-content">
              <div className="post-meta">
                <span className="author">{post.author || 'Anonymous'}</span>
                <span className="dot">•</span>
                <span className="date">
                  <Clock size={14} />
                  {formatDate(post.created_at)}
                </span>
              </div>
              
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
              </p>
              
              <Link to={`/post/${post.id}`} className="read-more">
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p>No posts yet. Be the first to write one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
