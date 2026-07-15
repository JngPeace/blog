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

  const renderStampTitle = (word) => {
    return word.split('').map((letter, index) => {
      // Create random rotations between -5 and 5 degrees
      const rotation = Math.random() * 10 - 5; 
      return (
        <span 
          key={index} 
          className="stamp-letter"
          style={{ '--rotate': rotation }}
        >
          {letter}
        </span>
      );
    });
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem', fontWeight: 'bold' }}>Loading layers...</div>;
  }

  return (
    <div className="container animate-fade-in">
      <header className="page-header">
        <h1 className="title-large">
          {renderStampTitle('STORIES')}
        </h1>
        <p className="subtitle">pieces of memory, scattered like paper.</p>
        
        {/* Decorative background elements mimicking the image */}
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-stamp">C</div>
      </header>

      <div className="posts-scatter-grid">
        {posts.map((post, index) => (
          <article 
            key={post.id} 
            className="glass post-card"
            style={{ 
              transform: `rotate(${Math.random() * 4 - 2}deg)`,
              marginTop: index % 2 !== 0 ? '3rem' : '0'
            }}
          >
            {post.image_url && (
              <div className="post-image-container">
                <img src={post.image_url} alt={post.title} className="post-image" />
                {/* Frosted overlay frame effect */}
                <div className="image-frame-overlay"></div>
              </div>
            )}
            
            <div className="post-content">
              <div className="post-meta">
                <span className="author">By {post.author || 'Anonymous'}</span>
                <span className="dot">•</span>
                <span className="date">
                  {formatDate(post.created_at)}
                </span>
              </div>
              
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                {post.content.length > 80 ? post.content.substring(0, 80) + '...' : post.content}
              </p>
              
              <Link to={`/post/${post.id}`} className="read-more">
                Read <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', border: '2px dashed #000' }}>
            <p style={{ fontWeight: 'bold' }}>No scattered stories yet. Write one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
