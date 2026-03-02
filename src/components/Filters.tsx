import type { SortOption } from '../types/github'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'best-match', label: 'Best match' },
  { value: 'stars', label: 'Most stars' },
  { value: 'forks', label: 'Most forks' },
  { value: 'updated', label: 'Recently updated' },
]

const LANGUAGES = [
  '', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust',
  'Java', 'C', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Dart',
]

interface Props {
  sort: SortOption
  language: string
  onSortChange: (sort: SortOption) => void
  onLanguageChange: (language: string) => void
}

export function Filters({ sort, language, onSortChange, onLanguageChange }: Props) {
  return (
    <div className="filters">
      <select
        className="filters__select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort repositories"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        className="filters__select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Filter by language"
      >
        <option value="">All languages</option>
        {LANGUAGES.filter(Boolean).map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  )
}
