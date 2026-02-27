import { PullRequestIcon, IssueIcon, ReviewIcon } from '../Icons';
import './TableFormat.css';

function TableFormat({ items }) {
  const getIcon = (type) => {
    switch (type) {
      case 'prs': return <PullRequestIcon />;
      case 'issues': return <IssueIcon />;
      case 'reviews': return <ReviewIcon />;
      default: return null;
    }
  };

  return (
    <div className="table-format">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Repository</th>
            <th>Title</th>
            <th>Updated</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="icon-cell">
                <span className={`icon ${item.type}`}>
                  {getIcon(item.type)}
                </span>
              </td>
              <td className="repo-cell">{item.repo}</td>
              <td className="title-cell">{item.title}</td>
              <td className="date-cell">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>
              <td>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  View →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableFormat;
