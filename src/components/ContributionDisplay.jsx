import { useState } from 'react';
import LinkFormat from './formats/LinkFormat';
import TableFormat from './formats/TableFormat';
import EmojiFormat from './formats/EmojiFormat';
import { sortContributions } from '../utils/filters';
import { CopyIcon, DownloadIcon, MarkdownIcon } from './Icons';
import { generateMarkdownByFormat } from './markdownFormats';
import './ContributionDisplay.css';

function ContributionDisplay({ contributions }) {
  const [format, setFormat] = useState('emoji');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedButton, setCopiedButton] = useState(null);
  const itemsPerPage = 20;

  const sorted = sortContributions(contributions.items, sortBy);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: contributions.items.length,
    prs: contributions.items.filter((item) => item.type === 'prs').length,
    issues: contributions.items.filter((item) => item.type === 'issues').length,
    reviews: contributions.items.filter((item) => item.type === 'reviews').length,
    lastUpdated: new Date(contributions.fetchedAt).toLocaleString(),
  };

  const handleButtonCopy = (buttonName) => {
    setCopiedButton(buttonName);
    setTimeout(() => setCopiedButton(null), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(contributions, null, 2));
    handleButtonCopy('json');
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(contributions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contributions.username}-contributions.json`;
    a.click();
    handleButtonCopy('download');
  };

  const handleCopyMarkdown = () => {
    const markdown = generateMarkdownByFormat(format, sorted, stats);
    navigator.clipboard.writeText(markdown);
    handleButtonCopy('markdown');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contribution-display">
      <div className="controls">
        <div className="control-group">
          <label>Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="emoji">Emoji Format</option>
            <option value="link">Link Format</option>
            <option value="table">Table Format</option>
          </select>
        </div>

        <div className="control-group">
          <label>Sort:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="repo">By Repository</option>
          </select>
        </div>

        <div className="actions">
          <button onClick={handleCopyMarkdown}>
            <MarkdownIcon /> {copiedButton === 'markdown' ? 'Copied!' : 'Markdown'}
          </button>
          <button onClick={handleCopyJSON}>
            <CopyIcon /> {copiedButton === 'json' ? 'Copied!' : 'JSON'}
          </button>
          <button onClick={handleDownloadJSON}>
            <DownloadIcon /> {copiedButton === 'download' ? 'Downloaded!' : 'Download'}
          </button>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-label">Total Contributions:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Merged PRs:</span>
          <span className="stat-value">{stats.prs}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Issues:</span>
          <span className="stat-value">{stats.issues}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reviews:</span>
          <span className="stat-value">{stats.reviews}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Updated:</span>
          <span className="stat-value">{stats.lastUpdated}</span>
        </div>
      </div>

      <div className="results">
        {format === 'emoji' ? (
          <EmojiFormat items={paginatedItems} />
        ) : format === 'link' ? (
          <LinkFormat items={paginatedItems} />
        ) : (
          <TableFormat items={paginatedItems} />
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt; PREV
          </button>
          <span>PAGE {currentPage} / {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            NEXT &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default ContributionDisplay;
