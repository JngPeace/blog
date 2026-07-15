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

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem', opacity: 0.5 }}>Loading...</div>;
  }

  return (
    <div className="container animate-fade-in">
      <header className="book-cover-header">
        <h1 className="deboss-text title-large">
          believe<br/>
          in<br/>
          yourself
        </h1>
        <div className="handwritten date-mark">2015 - 2024</div>
      </header>

      <div className="foil-cards-grid">
        {posts.map(post => (
          <article key={post.id} className="foil-card post-card">
            {post.image_url && (
              <div className="post-image-container">
                <img src={post.image_url} alt={post.title} className="post-image" />
                <div className="emboss-overlay"></div>
              </div>
            )}
            
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
              </p>
              
              <Link to={`/post/${post.id}`} className="read-more">
                View entry
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>
            <p className="deboss-text" style={{ fontSize: '1.2rem' }}>No entries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
