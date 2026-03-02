export function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line" style={{ width: '40%', marginBottom: 12 }} />
          <div className="skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton-line" style={{ width: '60%', marginBottom: 16 }} />
          <div className="skeleton-line" style={{ width: '30%', height: 10 }} />
        </div>
      ))}
    </>
  )
}

interface StatusMessageProps {
  type: 'idle' | 'error' | 'empty'
  error?: string | null
}

export function StatusMessage({ type, error }: StatusMessageProps) {
  if (type === 'idle') {
    return (
      <div className="status">
        <p className="status__title">Search GitHub repositories</p>
        <p className="status__body">Type a keyword to get started</p>
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div className="status status--error">
        <p className="status__title">Something went wrong</p>
        <p className="status__body">{error ?? 'An unexpected error occurred'}</p>
      </div>
    )
  }

  return (
    <div className="status">
      <p className="status__title">No repositories found</p>
      <p className="status__body">Try a different keyword or remove filters</p>
    </div>
  )
}
