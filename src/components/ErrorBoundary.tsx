import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-xl font-semibold text-theme-heading">Something went wrong</h1>
          <p className="mt-2 text-theme-muted">
            The page encountered an error. Try refreshing.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary mt-6 min-h-[44px]"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
