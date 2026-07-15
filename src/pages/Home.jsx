import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import './Home.css';

// Mock data until Supabase is connected
const MOCK_POSTS = [
  {
    id: 1,
    title: 'The Future of Web Design',
    excerpt: 'Exploring the new trends in UI/UX including glassmorphism, neo-brutalism, and how AI is shaping the future of digital experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 12, 2026',
    author: 'Peace'
  },
  {
    id: 2,
    title: 'Getting Started with Supabase',
    excerpt: 'A comprehensive guide to setting up your first project with Supabase, covering authentication, database rules, and edge functions.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 10, 2026',
    author: 'Peace'
  }
];

const Home = () => {
  return (
    <div className="container animate-fade-in">
      <header className="page-header">
        <h1 className="title-large text-gradient">Discover Stories</h1>
        <p className="subtitle">Read the latest articles on design, technology, and more.</p>
      </header>

      <div className="posts-grid">
        {MOCK_POSTS.map(post => (
          <article key={post.id} className="glass post-card">
            <div className="post-image-container">
              <img src={post.imageUrl} alt={post.title} className="post-image" />
              <div className="post-overlay"></div>
            </div>
            
            <div className="post-content">
              <div className="post-meta">
                <span className="author">{post.author}</span>
                <span className="dot">•</span>
                <span className="date">
                  <Clock size={14} />
                  {post.date}
                </span>
              </div>
              
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              
              <Link to={`/post/${post.id}`} className="read-more">
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
