# Contribution Showcase

A web application to showcase your GitHub contributions across repositories and organizations.

## Features

- Fetch merged PRs, issues, and reviews from GitHub
- Multiple display formats (link-based and table)
- Filter by organization vs user projects
- Sort by date or repository
- Export contributions as JSON
- Copy to clipboard functionality

## Setup

```bash
npm install
npm run dev
```

## Usage

1. Enter your GitHub username
2. Select contribution types (PRs, Issues, Reviews)
3. Click "Fetch Contributions"
4. View results in different formats
5. Filter and sort as needed
6. Export or copy JSON data

## Tech Stack

- React + Vite
- GitHub REST API
- Vanilla CSS

## Note

GitHub API has rate limits (60 requests/hour for unauthenticated requests). For higher limits, you can add authentication.
