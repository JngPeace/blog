import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Post Not Found</h2>
        <Link to="/" className="back-link" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={18} /> Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <article className="post-detail-container animate-fade-in">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Feed</span>
        </Link>
      </div>

      {post.image_url && (
        <div className="hero-image-container">
          <img src={post.image_url} alt={post.title} className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
      )}

      <div className="container content-container">
        <header className="detail-header">
          <div className="meta-info">
            <span className="meta-item">
              <User size={16} />
              {post.author || 'Anonymous'}
            </span>
            <span className="dot">•</span>
            <span className="meta-item">
              <Clock size={16} />
              {formatDate(post.created_at)}
            </span>
          </div>
          <h1 className="detail-title">{post.title}</h1>
        </header>

        <div className="detail-body">
          {post.content.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
