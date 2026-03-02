import { useEffect, useRef, useState } from 'react'
import { searchRepositories } from '../api/github'
import type { SearchParams, SearchResponse } from '../types/github'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface RepoSearchResult {
  status: Status
  data: SearchResponse | null
  error: string | null
}

const DEBOUNCE_MS = 350

export function useRepoSearch(params: SearchParams): RepoSearchResult {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const { query, page, sort, language } = params

  useEffect(() => {
    if (!query.trim()) {
      setStatus('idle')
      setData(null)
      setError(null)
      return
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      setStatus('loading')
      setError(null)

      try {
        const result = await searchRepositories({ query, page, sort, language })
        setData(result)
        setStatus('success')
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setStatus('error')
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      abortRef.current?.abort()
    }
  }, [query, page, sort, language])

  return { status, data, error }
}
