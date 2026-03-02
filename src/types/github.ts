export interface Repository {
  id: number
  full_name: string
  name: string
  owner: {
    login: string
    avatar_url: string
  }
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  html_url: string
  topics: string[]
}

export interface SearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

export type SortOption = 'best-match' | 'stars' | 'forks' | 'updated'

export interface SearchParams {
  query: string
  page: number
  sort: SortOption
  language: string
}
