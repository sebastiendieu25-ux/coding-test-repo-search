import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useRepoSearch } from './useRepoSearch'
import * as api from '../api/github'

const mockItems = [
  {
    id: 1, full_name: 'facebook/react', name: 'react',
    owner: { login: 'facebook', avatar_url: '' },
    description: 'A JS library', stargazers_count: 200000,
    forks_count: 40000, language: 'JavaScript',
    updated_at: '2024-01-01T00:00:00Z',
    html_url: 'https://github.com/facebook/react', topics: [],
  },
]

beforeEach(() => vi.restoreAllMocks())

describe('useRepoSearch', () => {
  it('returns idle state when query is empty', () => {
    const { result } = renderHook(() =>
      useRepoSearch({ query: '', page: 1, sort: 'best-match', language: '' })
    )
    expect(result.current.status).toBe('idle')
  })

  it('fetches and returns results for a non-empty query', async () => {
    vi.spyOn(api, 'searchRepositories').mockResolvedValueOnce({
      total_count: 1, incomplete_results: false, items: mockItems,
    })
    const { result } = renderHook(() =>
      useRepoSearch({ query: 'react', page: 1, sort: 'best-match', language: '' })
    )
    await waitFor(() => expect(result.current.status).toBe('success'), { timeout: 1000 })
    expect(result.current.data?.items).toHaveLength(1)
  })

  it('returns error status on API failure', async () => {
    vi.spyOn(api, 'searchRepositories').mockRejectedValueOnce(new Error('rate limit exceeded'))
    const { result } = renderHook(() =>
      useRepoSearch({ query: 'react', page: 1, sort: 'best-match', language: '' })
    )
    await waitFor(() => expect(result.current.status).toBe('error'), { timeout: 1000 })
    expect(result.current.error).toBe('rate limit exceeded')
  })
})
