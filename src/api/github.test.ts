import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchRepositories } from './github'

const mockResponse = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
      id: 1,
      full_name: 'facebook/react',
      name: 'react',
      owner: { login: 'facebook', avatar_url: '' },
      description: 'A JS library',
      stargazers_count: 200000,
      forks_count: 40000,
      language: 'JavaScript',
      updated_at: '2024-01-01T00:00:00Z',
      html_url: 'https://github.com/facebook/react',
      topics: [],
    },
  ],
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('searchRepositories', () => {
  it('calls the GitHub search API with correct params', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    await searchRepositories({ query: 'react', page: 1, sort: 'stars', language: '' })

    expect(fetchSpy).toHaveBeenCalledOnce()
    const url = new URL(fetchSpy.mock.calls[0][0] as string)
    expect(url.searchParams.get('q')).toBe('react')
    expect(url.searchParams.get('sort')).toBe('stars')
    expect(url.searchParams.get('page')).toBe('1')
  })

  it('appends language to query when provided', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    await searchRepositories({ query: 'react', page: 1, sort: 'best-match', language: 'TypeScript' })

    const url = new URL(fetchSpy.mock.calls[0][0] as string)
    expect(url.searchParams.get('q')).toBe('react language:TypeScript')
  })

  it('throws on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ message: 'rate limit exceeded' }),
    } as Response)

    await expect(
      searchRepositories({ query: 'react', page: 1, sort: 'best-match', language: '' })
    ).rejects.toThrow('rate limit exceeded')
  })
})
