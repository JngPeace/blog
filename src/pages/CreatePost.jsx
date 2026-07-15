import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Send } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // 1. Upload image to Supabase Storage if selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        imageUrl = data.publicUrl;
      }

      // 2. Insert post data into Supabase Database
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          { 
            title, 
            content, 
            image_url: imageUrl,
            author: 'Peace'
          }
        ]);

      if (insertError) throw insertError;

      alert('Post created successfully!');
      navigate('/'); // Go back to home page

    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Failed to create post. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in create-container">
      <div className="create-header">
        <h1 className="title-large text-gradient">Craft a Story</h1>
        <p className="subtitle">Share your thoughts, experiences, and ideas with the world.</p>
      </div>

      <form className="diary-card create-form lace-border" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control title-input"
            placeholder="Article Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="image-upload-container">
          {preview ? (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <button 
                type="button" 
                className="btn-icon remove-image" 
                onClick={() => { setPreview(null); setFile(null); }}
                disabled={isSubmitting}
              >
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
                disabled={isSubmitting}
              />
              <div className="upload-content">
                <div className="upload-icon-wrapper">
                  <Upload size={32} />
                  <ImageIcon size={24} className="sub-icon" />
                </div>
                <h3>Upload Cover Image</h3>
                <p>Click to browse images</p>
              </div>
            </label>
          )}
        </div>

        <div className="input-group content-group">
          <textarea
            className="form-control content-input"
            placeholder="Write your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : (
              <>Publish Post <Send size={18} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
