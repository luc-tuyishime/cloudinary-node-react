import React, { useState } from 'react';
import Alert from '../components/Alert';

function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  // Convert Image to a URL
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // POST To The DB
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-type': 'application/json' }
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <div>
      <h1 className="title">Upload an Image</h1>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {/* String that represent the entire image */}
      {previewSource && <img src={previewSource} alt="chosen" style={{ height: '300px' }} />}
    </div>
  );
}

export default Upload;
