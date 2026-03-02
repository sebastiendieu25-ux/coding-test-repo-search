import type { SearchParams, SearchResponse } from '../types/github'

const BASE_URL = 'https://api.github.com/search/repositories'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export async function searchRepositories(params: SearchParams): Promise<SearchResponse> {
  const { query, page, sort, language } = params

  const q = language ? `${query} language:${language}` : query

  const url = new URL(BASE_URL)
  url.searchParams.set('q', q)
  url.searchParams.set('per_page', '10')
  url.searchParams.set('page', String(page))
  url.searchParams.set('order', 'desc')

  if (sort !== 'best-match') {
    url.searchParams.set('sort', sort)
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`
  }

  const response = await fetch(url.toString(), { headers })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }))
    throw new Error(error.message ?? `HTTP ${response.status}`)
  }

  return response.json()
}
