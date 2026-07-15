import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const renderStuds = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <div key={i} className="silver-stud header-stud" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}></div>
    ));
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem', color: 'white' }}>Loading...</div>;
  }

  return (
    <div className="container animate-fade-in">
      <header className="diary-header">
        {/* Random scattered studs */}
        <div className="stud-container">
          {renderStuds(15)}
        </div>
        
        <h1 className="header-title">
          <span className="cross-stitch-text">My Diary</span>
        </h1>
        <div className="charm-accent">
          {/* SVG Heart Charm */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="url(#silver-grad)" filter="drop-shadow(2px 4px 4px rgba(0,0,0,0.3))">
            <defs>
              <linearGradient id="silver-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#d4d4d4" />
                <stop offset="100%" stopColor="#a3a3a3" />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </header>

      <div className="cards-grid">
        {posts.map((post) => (
          <article key={post.id} className="diary-card post-card lace-border">
            {post.image_url && (
              <div className="post-image-container">
                <img src={post.image_url} alt={post.title} className="post-image" />
                <div className="stud-corner top-left"></div>
                <div className="stud-corner top-right"></div>
                <div className="stud-corner bottom-left"></div>
                <div className="stud-corner bottom-right"></div>
              </div>
            )}
            
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                {post.content.length > 80 ? post.content.substring(0, 80) + '...' : post.content}
              </p>
              
              <Link to={`/post/${post.id}`} className="read-more">
                View entry
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: 'white' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>No entries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
