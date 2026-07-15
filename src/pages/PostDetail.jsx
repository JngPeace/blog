import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import './PostDetail.css';

// Using the same mock data for now
const MOCK_POSTS = {
  '1': {
    title: 'The Future of Web Design',
    content: `The landscape of web design is constantly evolving. In recent years, we've seen a shift towards more immersive and dynamic experiences. 

Glassmorphism, a trend that mimics frosted glass, has become incredibly popular for its ability to add depth and hierarchy to interfaces without cluttering them. Combined with vibrant colors and subtle micro-animations, it creates a sense of modernity and premium quality.

Another significant trend is the integration of AI-driven personalization, where the UI adapts to individual user preferences in real-time. As we move forward, the focus will increasingly be on creating not just functional websites, but engaging digital environments that leave a lasting impression.`,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    date: 'Oct 12, 2026',
    author: 'Peace'
  },
  '2': {
    title: 'Getting Started with Supabase',
    content: `Supabase has emerged as a powerful open-source alternative to Firebase, offering a complete backend-as-a-service solution built on top of PostgreSQL.

In this guide, we'll explore how to set up your first Supabase project. The process is remarkably straightforward: you create an organization, start a project, and instantly get access to a full-fledged Postgres database, complete with a RESTful API automatically generated using PostgREST.

One of the most compelling features of Supabase is its robust authentication system, which seamlessly integrates with your database rules (Row Level Security), ensuring your data remains secure while being easily accessible to authenticated users.`,
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1200',
    date: 'Oct 10, 2026',
    author: 'Peace'
  }
};

const PostDetail = () => {
  const { id } = useParams();
  const post = MOCK_POSTS[id] || {
    title: 'Post Not Found',
    content: 'The post you are looking for does not exist.',
    date: '',
    author: ''
  };

  return (
    <article className="post-detail-container animate-fade-in">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Feed</span>
        </Link>
      </div>

      {post.imageUrl && (
        <div className="hero-image-container">
          <img src={post.imageUrl} alt={post.title} className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
      )}

      <div className="container content-container">
        <header className="detail-header">
          <div className="meta-info">
            <span className="meta-item">
              <User size={16} />
              {post.author}
            </span>
            <span className="dot">•</span>
            <span className="meta-item">
              <Clock size={16} />
              {post.date}
            </span>
          </div>
          <h1 className="detail-title">{post.title}</h1>
        </header>

        <div className="detail-body">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
