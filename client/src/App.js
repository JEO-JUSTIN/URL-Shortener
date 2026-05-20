import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl(null);
    setCopied(false);

    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/shorten', { url });
      setShortUrl(response.data.shortUrl);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error shortening URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container">
      <h1>Shorten Link</h1>
      <p className="subtitle">Paste your long URL below to shorten it.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="url">Destination URL</label>
          <input
            type="url"
            id="url"
            placeholder="https://example.com/very-long-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten Link'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {shortUrl && (
        <div className="result-container">
          <label style={{ textAlign: 'left', marginBottom: '0.5rem', display: 'block' }}>
            Your Short Link
          </label>
          <div className="result-box">
            <input
              type="text"
              value={shortUrl}
              readOnly
              id="shortUrl"
            />
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              id="copyBtn"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
