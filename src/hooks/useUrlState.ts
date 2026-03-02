import { useCallback, useSyncExternalStore } from 'react'
import type { SearchParams, SortOption } from '../types/github'

function getSnapshot(): string {
  return window.location.search
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}

function parseParams(): SearchParams {
  const p = new URLSearchParams(window.location.search)
  return {
    query: p.get('q') ?? '',
    page: parseInt(p.get('page') ?? '1', 10) || 1,
    sort: (p.get('sort') as SortOption) || 'best-match',
    language: p.get('lang') ?? '',
  }
}

export function useUrlState() {
  useSyncExternalStore(subscribe, getSnapshot)

  const params = parseParams()

  const setParams = useCallback((next: SearchParams) => {
    const p = new URLSearchParams()
    if (next.query) p.set('q', next.query)
    if (next.page > 1) p.set('page', String(next.page))
    if (next.sort !== 'best-match') p.set('sort', next.sort)
    if (next.language) p.set('lang', next.language)
    const search = p.toString()
    window.history.pushState({}, '', search ? `?${search}` : '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])

  return { params, setParams }
}
