# GitHub Repository Search - Coding Test Web Frontend

Hello, thank you for considering my application !

How it work :
A focused search interface for GitHub repositories. Type a query, filter by language, sort by stars or forks, and navigate results across pages, all without the URL ever lying to you.

Built with React 18 and TypeScript. No component libraries. No state management library. Just hooks, plain CSS, and the GitHub Search API.

## Features

- **Search as you type** > no submit button needed
- **Sort** by best match, most stars, most forks, or recently updated
- **Filter by language** > TypeScript, Python, Go, Rust, ...
- **Pagination** > 10 results per page, up to 100 results total
- **URL state sync** > every search, filter, and page lives in the URL, shareable and back/forward-aware
- **Loading skeletons**, empty states, and rate limit error handling

## Stack decisions

- **Custom hooks only** > `useRepoSearch` owns the debounce and fetch logic, `useUrlState` syncs everything to the URL via `useSyncExternalStore`. Reaching for a data-fetching library for a single endpoint felt like hiding the work.
- **Plain CSS with custom properties** > full design control, no runtime overhead, no reponsive problems.
- **Tests where it matters** > `useRepoSearch`, `useUrlState`, and the API module are unit tested with Vitest and Testing Library. Hooks are tested in isolation by mocking the API layer, keeping tests fast and deterministic without hitting the network.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Optional: GitHub token

Without a token the API allows 10 requests per minute. If you need more : 

```bash
cp .env.example .env
# Add your token to .env
```

Generate one at [github.com/settings/tokens](https://github.com/settings/tokens) — no scopes needed for public repo search.

## Scripts

```bash
npm run dev        # Dev server
npm test           # Run test (exits after)
npm run test:watch # Run test in watch mode
```
