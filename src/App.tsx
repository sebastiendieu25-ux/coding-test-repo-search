import { useRepoSearch } from './hooks/useRepoSearch'
import { useUrlState } from './hooks/useUrlState'
import { SearchBar } from './components/SearchBar'
import { Filters } from './components/Filters'
import { RepoCard } from './components/RepoCard'
import { Pagination } from './components/Pagination'
import { StatusMessage, LoadingSkeleton } from './components/StatusMessage'
import type { SortOption } from './types/github'

const PER_PAGE = 10

export default function App() {
  const { params, setParams } = useUrlState()
  const { status, data, error } = useRepoSearch(params)

  const handleQueryChange = (query: string) => {
    setParams({ ...params, query, page: 1 })
  }

  const handleSortChange = (sort: SortOption) => {
    setParams({ ...params, sort, page: 1 })
  }

  const handleLanguageChange = (language: string) => {
    setParams({ ...params, language, page: 1 })
  }

  const handlePageChange = (page: number) => {
    setParams({ ...params, page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Repository Search</h1>
        <p className="header__subtitle">Search across millions of GitHub repositories</p>
      </header>

      <SearchBar value={params.query} onChange={handleQueryChange} />

      <Filters
        sort={params.sort}
        language={params.language}
        onSortChange={handleSortChange}
        onLanguageChange={handleLanguageChange}
      />

      {status === 'loading' && <LoadingSkeleton />}

      {status === 'success' && data && (
        <>
          <p className="results-meta">
            <strong>{data.total_count.toLocaleString()}</strong> repositories found
          </p>
          {data.items.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          <Pagination
            currentPage={params.page}
            totalCount={data.total_count}
            perPage={PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {status === 'idle' && <StatusMessage type="idle" />}
      {status === 'error' && <StatusMessage type="error" error={error} />}
      {status === 'success' && data?.items.length === 0 && <StatusMessage type="empty" />}
    </div>
  )
}
