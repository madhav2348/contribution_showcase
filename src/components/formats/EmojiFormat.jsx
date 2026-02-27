import './EmojiFormat.css';

function EmojiFormat({ items }) {
  const groupedByRepo = items.reduce((acc, item) => {
    if (!acc[item.repo]) acc[item.repo] = [];
    acc[item.repo].push(item);
    return acc;
  }, {});

  return (
    <div className="emoji-format">
      {Object.entries(groupedByRepo).map(([repo, contributions]) => (
        contributions.map((item, idx) => {
          const emoji = item.type === 'prs' ? '✅' : item.type === 'issues' ? '🐛' : '💬';
          const typeLabel = item.type === 'prs' ? 'Merged Pull Request' : item.type === 'issues' ? 'Issue' : 'Review';
          const date = new Date(item.updatedAt).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          });

          return (
            <div key={`${repo}-${idx}`} className="emoji-item">
              <h3 className="emoji-repo">🔥 {item.repo}</h3>
              <div className="emoji-details">
                <span className="emoji-badge">{emoji} {typeLabel}</span>
                <span className="emoji-separator">-</span>
                <span className="emoji-date">🗓 {date}</span>
                <span className="emoji-separator">-</span>
                <span className="emoji-title">💬 {item.title}</span>
                <span className="emoji-separator">-</span>
                <span className="emoji-link">🔗 <a href={item.url} target="_blank" rel="noopener noreferrer">View</a></span>
              </div>
            </div>
          );
        })
      ))}
    </div>
  );
}

export default EmojiFormat;
