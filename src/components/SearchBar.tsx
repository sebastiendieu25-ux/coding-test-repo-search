interface Props {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="6.5" cy="6.5" r="4.5" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
      </span>
      <input
        className="search-bar__input"
        type="search"
        placeholder="Search repositories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        aria-label="Search GitHub repositories"
      />
    </div>
  )
}
