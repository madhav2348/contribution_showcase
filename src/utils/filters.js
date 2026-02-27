export function filterContributions(items, filter, username) {
  if (filter === 'all') return items;
  
  if (filter === 'org') {
    return items.filter(item => {
      const [owner] = item.repo.split('/');
      return owner.toLowerCase() !== username.toLowerCase();
    });
  }
  
  if (filter === 'user') {
    return items.filter(item => {
      const [owner] = item.repo.split('/');
      return owner.toLowerCase() === username.toLowerCase();
    });
  }
  
  return items;
}

export function sortContributions(items, sortBy) {
  const sorted = [...items];
  
  if (sortBy === 'recent') {
    sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sortBy === 'oldest') {
    sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else if (sortBy === 'repo') {
    sorted.sort((a, b) => a.repo.localeCompare(b.repo));
  }
  
  return sorted;
}
