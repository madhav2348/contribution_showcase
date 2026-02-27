import { PullRequestIcon, IssueIcon, ReviewIcon } from '../Icons';
import './LinkFormat.css';

function LinkFormat({ items }) {
  const groupedByRepo = items.reduce((acc, item) => {
    if (!acc[item.repo]) acc[item.repo] = [];
    acc[item.repo].push(item);
    return acc;
  }, {});

  const getIcon = (type) => {
    switch (type) {
      case 'prs': return <PullRequestIcon />;
      case 'issues': return <IssueIcon />;
      case 'reviews': return <ReviewIcon />;
      default: return null;
    }
  };

  return (
    <div className="link-format">
      {Object.entries(groupedByRepo).map(([repo, contributions]) => (
        <div key={repo} className="repo-group">
          <h3 className="repo-name">{repo}</h3>
          <ul className="contribution-list">
            {contributions.map((item, idx) => (
              <li key={idx} className="contribution-item">
                <span className={`icon ${item.type}`}>
                  {getIcon(item.type)}
                </span>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span className="date">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LinkFormat;
