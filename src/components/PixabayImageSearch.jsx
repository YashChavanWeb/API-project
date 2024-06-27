import React, { useState } from 'react';

function PixabayImageSearch() {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${encodeURIComponent(keyword)}&image_type=photo`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pixabay Image Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img src={image.previewURL} alt={image.tags} style={{ width: '200px', height: 'auto' }} />
            <p>Tags: {image.tags}</p>
            <a href={image.pageURL} target="_blank" rel="noopener noreferrer">View on Pixabay</a>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PixabayImageSearch;
