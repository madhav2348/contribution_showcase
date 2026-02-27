import { useState } from 'react';
import ContributionForm from './components/ContributionForm';
import ContributionDisplay from './components/ContributionDisplay';
import './App.css';
import { PullRequestIcon } from './components/Icons';

function App() {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchContributions = async (username, types) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubContributions(username, types);
      setContributions(data);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      setError(error.message || 'Failed to fetch contributions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="icon-wrapper">
            <PullRequestIcon />
          </div>
          <div className="header-text">
            <h1>Contribution Showcase</h1>
            <p>Showcase your GitHub contributions</p>
          </div>
        </div>
      </header>
      
      <main className="main">
        <ContributionForm 
          onFetch={handleFetchContributions} 
          loading={loading}
          error={error}
        />
        
        {contributions && (
          <ContributionDisplay contributions={contributions} />
        )}
      </main>
    </div>
  );
}

async function fetchGitHubContributions(username, types) {
  const contributions = {
    username,
    fetchedAt: new Date().toISOString(),
    items: []
  };

  for (const type of types) {
    const items = await fetchByType(username, type);
    contributions.items.push(...items);
  }

  return contributions;
}

async function fetchByType(username, type) {
  const queries = {
    prs: `is:pr author:${username} is:merged -user:${username}`,
    issues: `is:issue author:${username} -user:${username}`,
    reviews: `is:pr reviewed-by:${username} -user:${username}`
  };

  const response = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(queries[type])}&per_page=100&sort=updated`
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.items.map(item => ({
    type,
    title: item.title,
    url: item.html_url,
    repo: item.repository_url.split('/').slice(-2).join('/'),
    state: item.state,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export default App;
