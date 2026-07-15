import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Send } from 'lucide-react';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: Submit to Supabase
    alert('Post creation will be connected to Supabase soon!');
  };

  return (
    <div className="container animate-fade-in create-container">
      <div className="create-header">
        <h1 className="title-large text-gradient">Craft a Story</h1>
        <p className="subtitle">Share your thoughts, experiences, and ideas with the world.</p>
      </div>

      <form className="glass create-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control title-input"
            placeholder="Article Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="image-upload-container">
          {preview ? (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <button type="button" className="btn-icon remove-image" onClick={() => setPreview(null)}>
                &times;
              </button>
            </div>
          ) : (
            <label className="upload-placeholder">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden-input"
              />
              <div className="upload-content">
                <div className="upload-icon-wrapper">
                  <Upload size={32} />
                  <ImageIcon size={24} className="sub-icon" />
                </div>
                <h3>Upload Cover Image</h3>
                <p>Drag and drop or click to browse</p>
              </div>
            </label>
          )}
        </div>

        <div className="input-group content-group">
          <textarea
            className="form-control content-input"
            placeholder="Write your story here... Markdown is supported (coming soon)."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary submit-btn">
            Publish Post <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
