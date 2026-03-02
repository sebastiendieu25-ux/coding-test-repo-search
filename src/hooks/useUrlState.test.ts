import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUrlState } from './useUrlState'

describe('useUrlState', () => {
  it('reads default values when URL has no params', () => {
    window.history.replaceState({}, '', '/')
    const { result } = renderHook(() => useUrlState())
    expect(result.current.params.query).toBe('')
    expect(result.current.params.page).toBe(1)
    expect(result.current.params.sort).toBe('best-match')
    expect(result.current.params.language).toBe('')
  })

  it('reads values from URL params', () => {
    window.history.replaceState({}, '', '/?q=react&page=3&sort=stars&lang=TypeScript')
    const { result } = renderHook(() => useUrlState())
    expect(result.current.params.query).toBe('react')
    expect(result.current.params.page).toBe(3)
    expect(result.current.params.sort).toBe('stars')
    expect(result.current.params.language).toBe('TypeScript')
  })

  it('updates the URL when setParams is called', () => {
    window.history.replaceState({}, '', '/')
    const { result } = renderHook(() => useUrlState())
    act(() => {
      result.current.setParams({ query: 'vue', page: 2, sort: 'forks', language: 'JavaScript' })
    })
    const url = new URL(window.location.href)
    expect(url.searchParams.get('q')).toBe('vue')
    expect(url.searchParams.get('page')).toBe('2')
    expect(url.searchParams.get('sort')).toBe('forks')
    expect(url.searchParams.get('lang')).toBe('JavaScript')
  })
})
