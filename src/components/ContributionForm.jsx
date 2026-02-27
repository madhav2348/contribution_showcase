import { useState } from 'react';
import './ContributionForm.css';

function ContributionForm({ onFetch, loading, error }) {
  const [username, setUsername] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['prs']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && selectedTypes.length > 0) {
      onFetch(username.trim(), selectedTypes);
    }
  };

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <form className="contribution-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">GitHub Username</label>
        <div className="input-wrapper">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            disabled={loading}
            className={error ? 'error' : ''}
          />
        </div>
        {error && (
          <div className="error-message">
            <span className="error-icon">✕</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Contribution Types</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedTypes.includes('prs')}
              onChange={() => toggleType('prs')}
              disabled={loading}
            />
            Merged Pull Requests
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedTypes.includes('issues')}
              onChange={() => toggleType('issues')}
              disabled={loading}
            />
            Issues
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedTypes.includes('reviews')}
              onChange={() => toggleType('reviews')}
              disabled={loading}
            />
            Reviews
          </label>
        </div>
      </div>

      <div className="button-wrapper">
        <button type="submit" disabled={loading || !username.trim() || selectedTypes.length === 0}>
          {loading ? 'Loading...' : 'Fetch Contributions'}
        </button>
      </div>
    </form>
  );
}

export default ContributionForm;
