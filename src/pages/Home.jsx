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
